import { db } from "@/server/db"
import { Occupant } from "@/server/db/schema"
import {
  OccupantResponse,
  toOccupantResponse,
} from "@/server/models/responses/occupant"
import { comparePassword } from "@/server/security/password"
import { generateToken } from "@/server/security/token"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"
import { z } from "zod"

const Param = z.object({
  phone: z.string(),
  password: z.string(),
})

type Result = {
  token: string
  occupant: OccupantResponse
}

export const POST = defineHandler(async (req) => {
  const param = await bindJson(req, Param)
  const occupant = await db().query.Occupant.findFirst({
    where: eq(Occupant.phone, param.phone),
  })
  if (!occupant) return sendErrors(404, "Phone not registered")

  let isCorrectPassword = await comparePassword(
    param.password,
    occupant.password,
  )
  if (!isCorrectPassword) return sendErrors(401, "Password incorrect")

  let token = generateToken({
    sub: occupant.id.toString(),
    role: occupant.role,
  })

  const result: Result = {
    token: token,
    occupant: toOccupantResponse(occupant)!,
  }

  return sendData(200, result)
})
