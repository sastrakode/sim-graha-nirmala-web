import { db } from "@/server/db"
import { Role, _InsertHouse, _InsertRole } from "@/server/db/schema"
import { toRoleResponse } from "@/server/models/responses/role"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq, or } from "drizzle-orm"
import { z } from "zod"

const Param = z.object({
  code: z.string(),
  name: z.string(),
})

export const POST = defineHandler(async (req) => {
  const param = await bindJson(req, Param)
  let isRoleExist = await db.query.Role.findFirst({
    where: or(eq(Role.code, param.code), eq(Role.name, param.name)),
  })
  if (isRoleExist) return sendErrors(409, "Role already exist")

  let role: _InsertRole = {
    code: param.code,
    name: param.name,
  }

  let [newRole] = await db.insert(Role).values(role).returning()
  return sendData(201, toRoleResponse(newRole))
})
