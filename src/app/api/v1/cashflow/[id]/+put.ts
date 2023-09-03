import { db } from "@/server/db"
import { Cashflow } from "@/server/db/schema"
import { toCashflowResponse } from "@/server/models/responses/cashflow"
import { getCurrentStaff, useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"
import { z } from "zod"

const Param = z.object({
  amount: z.number(),
  movement: z.enum(["income", "outcome"]),
  description: z.string().nullable(),
  title: z.string(),
})

export const PUT = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    useAuth(req, "admin", "treasurer")
    const param = await bindJson(req, Param)
    const staff = await getCurrentStaff(req)

    let cashflow = await db().query.Cashflow.findFirst({
      where: eq(Cashflow.id, params.id),
    })
    if (!cashflow) return sendErrors(404, "Cashflow not found" as any)

    cashflow.amount = param.amount
    cashflow.movement = param.movement
    cashflow.description = param.description
    cashflow.title = param.title

    await db().update(Cashflow).set(cashflow).where(eq(Cashflow.id, params.id))

    return sendData(200, toCashflowResponse(cashflow))
  },
)
