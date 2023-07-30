import { db } from "@/server/db"
import { Staff } from "@/server/db/schema"
import { toStaffResponse } from "@/server/models/responses/staff"
import { useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"
import { z } from "zod"

const Param = z.object({
  name: z.string(),
  email: z.string().email().nullable(),
  phone: z.string(),
  role: z.enum(["admin", "secretary", "treasurer", "security_guard"]),
})

export const PUT = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    useAuth("admin")
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

    let staff = await db().query.Staff.findFirst({
      where: eq(Staff.id, params.id),
    })
    if (!staff) return sendErrors(404, "Staff not found")

    staff.name = param.name
    staff.email = param.email
    staff.phone = param.phone
    staff.role = param.role
    staff.updatedAt = new Date()

    await db().update(Staff).set(staff).where(eq(Staff.id, params.id))
    return sendData(201, toStaffResponse(staff))
  }
)
