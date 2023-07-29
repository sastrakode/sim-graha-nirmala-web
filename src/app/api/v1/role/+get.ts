import { db } from "@/server/db"
import { toRoleResponse } from "@/server/models/responses/role"
import { defineHandler } from "@/server/web/handler"
import { sendData } from "@/server/web/response"

export const GET = defineHandler(async () => {
  let roles = await db.query.Role.findMany()
  return sendData(200, roles.map(toRoleResponse))
})