import { db } from "@/server/db"
import { Role, Staff } from "@/server/db/schema"
import { StaffResponse, toStaffResponse } from "@/server/models/responses/staff"
import { comparePassword } from "@/server/security/password"
import { generateToken } from "@/server/security/token"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"
import { z } from "zod"

const Param = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type Result = {
  token: string
  staff: StaffResponse
}

export const POST = defineHandler(async (req) => {
  const param = await bindJson(req, Param)
  let staff = await db.query.Staff.findFirst({
    where: eq(Staff.email, param.email),
  })
  if (!staff) return sendErrors(404, "Staff not found")

  let match = await comparePassword(param.password, staff.password)
  if (!match) return sendErrors(401, "Password incorrect")

  let role = await db.query.Role.findFirst({
    where: eq(Role.id, staff.roleId),
  })
  if (!role) return sendErrors(404, "Role not found")

  let token = generateToken({
    sub: staff.id.toString(),
    role: role.code,
  })

  const result: Result = {
    token: token,
    staff: toStaffResponse(staff)!,
  }

  return sendData(200, result)
})
