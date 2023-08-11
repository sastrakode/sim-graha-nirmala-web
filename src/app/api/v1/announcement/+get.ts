import { db } from "@/server/db"
import { Announcement, Staff } from "@/server/db/schema"
import { toAnnouncementResponse } from "@/server/models/responses/announcement"
import { defineHandler } from "@/server/web/handler"
import { sendData } from "@/server/web/response"
import { eq } from "drizzle-orm"

export const GET = defineHandler(async () => {
  const announcements = await db().query.Announcement.findMany({
    with: {
      author: true,
    },
  })

  return sendData(
    200,
    announcements.map((announcement) =>
      toAnnouncementResponse(announcement, {
        author: announcement.author,
      }),
    ),
  )
})
