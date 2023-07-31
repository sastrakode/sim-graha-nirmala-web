import { db } from "@/server/db"
import { toAnnouncementResponse } from "@/server/models/responses/announcement"
import { defineHandler } from "@/server/web/handler"
import { sendData } from "@/server/web/response"

export const GET = defineHandler(async () => {
  const announcements = await db().query.Announcement.findMany()
  return sendData(200, announcements.map(toAnnouncementResponse))
})
