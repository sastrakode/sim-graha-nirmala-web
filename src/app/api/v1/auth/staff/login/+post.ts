import { db } from "@/server/db"
import { Staff } from "@/server/db/schema"
import { StaffResponse, toStaffResponse } from "@/server/models/responses/staff"
import { comparePassword } from "@/server/security/password"
import { generateToken } from "@/server/security/token"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"
import { z } from "zod"

const Param = z.object({
  phone: z.string(),
  password: z.string().min(8),
})

type Response = {
  token: string
  staff: StaffResponse
}

export const POST = defineHandler(async (req) => {
  const param = await bindJson(req, Param)
  let staff = await db().query.Staff.findFirst({
    where: eq(Staff.phone, param.phone),
  })
  if (!staff) return sendErrors(404, "Phone not registered")

  let isCorrectPassword = await comparePassword(param.password, staff.password)
  if (!isCorrectPassword) return sendErrors(401, "Password incorrect")

  let token = generateToken({
    sub: staff.id.toString(),
    role: staff.role,
    roleType: "staff",
  })

  const response: Response = {
    token: token,
    staff: toStaffResponse(staff)!,
  }

  return sendData(200, response)
})
