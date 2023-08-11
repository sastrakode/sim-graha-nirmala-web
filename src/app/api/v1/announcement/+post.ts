import { db } from "@/server/db"
import { Announcement, TInsertAnnouncement } from "@/server/db/schema"
import { toAnnouncementResponse } from "@/server/models/responses/announcement"
import { getCurrentStaff, useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData } from "@/server/web/response"
import { z } from "zod"

const Param = z.object({
  title: z.string(),
  content: z.string(),
  announcement_category_id: z.number(),
})

export const POST = defineHandler(async (req) => {
  useAuth(req, "admin", "secretary")
  const param = await bindJson(req, Param)

  const staff = await getCurrentStaff(req)
  const announcement: TInsertAnnouncement = {
    title: param.title,
    content: param.content,
    announcementCategoryId: param.announcement_category_id,
    authorId: staff.id,
  }

  const [newAnnouncement] = await db()
    .insert(Announcement)
    .values(announcement)
    .returning()
  return sendData(201, toAnnouncementResponse(newAnnouncement))
})
