import { db } from "@/server/db"
import { Role, Staff, TInsertStaff } from "@/server/db/schema"
import { toStaffResponse } from "@/server/models/responses/staff"
import { useAuth } from "@/server/security/auth"
import { hashPassword } from "@/server/security/password"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"
import { z } from "zod"

const Param = z.object({
  role_id: z.number(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  password: z.string().min(8),
})

export const POST = defineHandler(async (req) => {
  useAuth("admin")
  const param = await bindJson(req, Param)

  let role = await db().query.Role.findFirst({
    where: eq(Role.id, param.role_id),
  })
  if (!role) return sendErrors(404, "Role not found")

  let staffExists = await db().query.Staff.findFirst({
    where: eq(Staff.email, param.email),
  })
  if (staffExists) return sendErrors(409, "Email already registered")

  staffExists = await db().query.Staff.findFirst({
    where: eq(Staff.phone, param.phone),
  })
  if (staffExists) return sendErrors(409, "Phone already registered")

  let staff: TInsertStaff = {
    roleId: param.role_id,
    name: param.name,
    email: param.email,
    phone: param.phone,
    password: await hashPassword(param.password),
  }

  let [newStaff] = await db().insert(Staff).values(staff).returning()
  return sendData(201, toStaffResponse(newStaff))
})
