import { db } from "@/server/db"
import { toAnnouncementCategoryResponse } from "@/server/models/responses/announcement-category"
import { defineHandler } from "@/server/web/handler"
import { sendData } from "@/server/web/response"

export const GET = defineHandler(async () => {
  const announcementCategories =
    await db().query.AnnouncementCategory.findMany()

  return sendData(
    200,
    announcementCategories.map(toAnnouncementCategoryResponse),
  )
})
