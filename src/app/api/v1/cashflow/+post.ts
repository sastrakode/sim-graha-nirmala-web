import { db } from "@/server/db"
import { Cashflow, TInsertCashflow } from "@/server/db/schema"
import { toCashflowResponse } from "@/server/models/responses/cashflow"
import { getCurrentStaff, useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData } from "@/server/web/response"
import { z } from "zod"

const Param = z.object({
  title: z.string(),
  amount: z.number(),
  movement: z.enum(["income", "outcome"]),
  description: z.string().optional().nullable(),
})

export const POST = defineHandler(async (req) => {
  useAuth(req, {
    staff: ["admin", "treasurer"],
  })
  const staff = await getCurrentStaff(req)
  const param = await bindJson(req, Param)

  const cashflow: TInsertCashflow = {
    authorId: staff.id,
    title: param.title,
    amount: param.amount,
    movement: param.movement,
    description: param.description,
  }

  const [newCashflow] = await db().insert(Cashflow).values(cashflow).returning()
  return sendData(201, toCashflowResponse(newCashflow))
})
