import { db } from "@/server/db"
import { Billing, House, Payment } from "@/server/db/schema"
import { defineHandler } from "@/server/web/handler"
import { sendData, sendErrors } from "@/server/web/response"
import { eq, inArray } from "drizzle-orm"

export const GET = defineHandler(
  async (_, { params }: { params: { id: number } }) => {
    const house = await db().query.House.findFirst({
      where: eq(House.id, params.id),
    })
    if (!house) return sendErrors(404, "House not found" as any)

    const billings = await db().query.Billing.findMany({
      where: eq(Billing.houseId, house.id),
    })

    const payments = await db().query.Payment.findMany({
      where: inArray(
        Payment.billingId,
        billings.map((billing) => billing.id),
      ),
    })

    return sendData(200, payments)
  },
)
