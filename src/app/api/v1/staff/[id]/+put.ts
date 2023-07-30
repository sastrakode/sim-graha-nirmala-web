import { db } from "@/server/db"
import { Role, Staff } from "@/server/db/schema"
import { toStaffResponse } from "@/server/models/responses/staff"
import { useAuth } from "@/server/security/auth"
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
})

export const PUT = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
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

    let staff = await db().query.Staff.findFirst({
      where: eq(Staff.id, params.id),
    })
    if (!staff) return sendErrors(404, "Staff not found")

    staff.roleId = param.role_id
    staff.name = param.name
    staff.email = param.email
    staff.phone = param.phone
    staff.updatedAt = new Date()

    await db().update(Staff).set(staff).where(eq(Staff.id, params.id))
    return sendData(201, toStaffResponse(staff))
  }
)
