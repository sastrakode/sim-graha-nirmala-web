import { db } from "@/server/db"
import { toStaffResponse } from "@/server/models/responses/staff"
import { defineHandler } from "@/server/web/handler"
import { sendData } from "@/server/web/response"

export const GET = defineHandler(async () => {
  const staffs = await db.query.Staff.findMany()
  return sendData(200, staffs.map(toStaffResponse))
})
