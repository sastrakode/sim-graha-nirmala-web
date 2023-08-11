import { db } from "@/server/db"
import {
  AnnouncementCategory,
  TInsertAnnouncementCategory,
} from "@/server/db/schema"
import { toAnnouncementCategoryResponse } from "@/server/models/responses/announcement-category"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"
import { z } from "zod"

const Param = z.object({
  name: z.string(),
})

export const POST = defineHandler(async (req) => {
  const param = await bindJson(req, Param)

  const announcementCategoryExist =
    await db().query.AnnouncementCategory.findFirst({
      where: eq(AnnouncementCategory.name, param.name),
    })
  if (announcementCategoryExist) {
    return sendErrors(409, "Announcement category already exist")
  }

  const announcementCategory: TInsertAnnouncementCategory = {
    name: param.name,
  }

  const [newAnnouncementCategory] = await db()
    .insert(AnnouncementCategory)
    .values(announcementCategory)
    .returning()

  return sendData(201, toAnnouncementCategoryResponse(newAnnouncementCategory))
})
