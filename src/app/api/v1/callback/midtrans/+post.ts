import { db } from "@/server/db"
import { Billing, Payment } from "@/server/db/schema"
import { snap } from "@/server/providers/midtrans"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"
import { z } from "zod"

const Param = z.object({
  order_id: z.string(),
  transaction_status: z.string(),
  fraud_status: z.string(),
})

export const POST = defineHandler(async (req) => {
  const param = await bindJson(req, Param)

  let payment = await db().query.Payment.findFirst({
    where: eq(Payment.invoice, param.order_id),
  })
  if (!payment) return sendErrors(404, { message: "Payment not found" })

  const res = await snap().transaction.status(payment.invoice)
  payment.status = res.transaction_status

  const [updatedPayment] = await db()
    .update(Payment)
    .set(payment)
    .where(eq(Payment.id, payment.id))
    .returning()
  if (updatedPayment.status === "settlement") {
    await db()
      .update(Billing)
      .set({ isPaid: true })
      .where(eq(Billing.id, updatedPayment.billingId))
  }

  return sendData(200, updatedPayment)
})
