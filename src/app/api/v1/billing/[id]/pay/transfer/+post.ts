import { db } from "@/server/db"
import { Billing, Payment, TInsertPayment } from "@/server/db/schema"
import { generateOrderId, snap } from "@/server/providers/midtrans"
import { getCurrentOccupant, useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { sendData } from "@/server/web/response"
import { format } from "date-fns"
import { eq } from "drizzle-orm"

export const POST = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    useAuth(req, "owner", "renter")
    const occupant = await getCurrentOccupant(req)

    const billing = await db().query.Billing.findFirst({
      where: eq(Billing.id, params.id),
    })
    if (!billing) return sendData(404, { message: "Billing not found" })

    const now = new Date()
    const expiredAt = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    const parameter = {
      transaction_details: {
        order_id: generateOrderId(),
        gross_amount: 150_000,
      },
      customer_details: {
        first_name: "John",
        last_name: "Watson",
        email: "test@example.com",
        phone: "628123456",
      },
      enabled_payments: ["credit_card", "bank_transfer", "gopay", "shopeepay"],
      callbacks: {
        finish: "https://demo.midtrans.com",
      },
      expiry: {
        start_time: format(now, "yyyy-MM-dd HH:mm:ss +0700"),
        unit: "hours",
        duration: 24,
      },
    }

    const res = await snap().createTransaction(parameter)

    const payment: TInsertPayment = {
      billingId: params.id,
      amount: 150_000,
      payerId: occupant.id,
      invoice: generateOrderId(),
      token: res.token,
      status: "pending",
      mode: "transfer",
      expired_at: expiredAt,
    }

    const [newPayment] = await db().insert(Payment).values(payment).returning()

    return sendData(200, newPayment)
  },
)