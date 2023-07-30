import { db } from "@/server/db"
import { Role } from "@/server/db/schema"
import { toRoleResponse } from "@/server/models/responses/role"
import { useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"
import { z } from "zod"

const Param = z.object({
  code: z.string(),
  name: z.string(),
})

export const PUT = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    useAuth("admin")
    let param = await bindJson(req, Param)

    let role = await db.query.Role.findFirst({
      where: eq(Role.id, params.id),
    })
    if (!role) return sendErrors(404, "Role not found")

    role.code = param.code
    role.name = param.name
    role.updatedAt = new Date()

    await db.update(Role).set(role).where(eq(Role.id, params.id))
    return sendData(200, toRoleResponse(role))
  }
)
