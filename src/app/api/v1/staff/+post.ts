import { db } from "@/server/db"
import { Staff, TInsertStaff } from "@/server/db/schema"
import { toStaffResponse } from "@/server/models/responses/staff"
import { useAuth } from "@/server/security/auth"
import { hashPassword } from "@/server/security/password"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"
import { z } from "zod"

const Param = z.object({
  name: z.string(),
  email: z.string().email().nullable(),
  phone: z.string(),
  password: z.string().min(8),
  role: z.enum(["admin", "secretary", "treasurer", "security_guard"]),
})

export const POST = defineHandler(async (req) => {
  useAuth(req, "admin")
  const param = await bindJson(req, Param)

  if (param.email) {
    let staffExists = await db().query.Staff.findFirst({
      where: eq(Staff.email, param.email),
    })
    if (staffExists) return sendErrors(409, "Email already registered")
  }

  let staffExists = await db().query.Staff.findFirst({
    where: eq(Staff.phone, param.phone),
  })
  if (staffExists) return sendErrors(409, "Phone already registered")

  let staff: TInsertStaff = {
    name: param.name,
    email: param.email,
    phone: param.phone,
    password: await hashPassword(param.password),
    role: param.role,
  }

  let [newStaff] = await db().insert(Staff).values(staff).returning()
  return sendData(201, toStaffResponse(newStaff))
})
