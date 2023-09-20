import { db } from "@/server/db"
import { Billing, Payment, TInsertPayment } from "@/server/db/schema"
import { getCurrentStaff, useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"
import { z } from "zod"

const Param = z.object({
  occupant_id: z.number().nonnegative(),
})

export const POST = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    useAuth(req, "admin", "treasurer")
    const param = await bindJson(req, Param)

    let billing = await db().query.Billing.findFirst({
      where: eq(Billing.id, params.id),
    })
    if (!billing) return sendErrors(404, { message: "Billing not found" })

    if (billing.isPaid) {
      return sendErrors(423, { message: "Billing already paid" })
    }

    const payment: TInsertPayment = {
      billingId: billing.id,
      amount: billing.amount,
      payerId: param.occupant_id,
      status: "settlement",
      mode: "cash",
    }

    const [newPayment] = await db().insert(Payment).values(payment).returning()
    billing.isPaid = true
    await db().update(Billing).set(billing).where(eq(Billing.id, billing.id))

    return sendData(200, newPayment)
  },
)
