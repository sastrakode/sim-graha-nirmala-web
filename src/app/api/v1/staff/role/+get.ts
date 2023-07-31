import { db } from "@/server/db"
import { useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { sendData } from "@/server/web/response"
import { sql } from "drizzle-orm"

type Result = string[]

export const GET = defineHandler(async (req) => {
  useAuth(req, "admin")

  const roles = await db().execute(
    sql`SELECT unnest(enum_range(NULL::staff_role))`
  )
  const result: Result = roles.map((r) => r.unnest as string)

  return sendData(200, result)
})
