import { errorDefinition } from "@/lib/constants"
import { db } from "@/server/db"
import { Announcement } from "@/server/db/schema"
import { toAnnouncementResponse } from "@/server/models/responses/announcement"
import { useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"
import { z } from "zod"

const Param = z.object({
  title: z.string(),
  content: z.string(),
  announcement_category_id: z.number(),
})

export const PUT = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    useAuth(req, "admin", "secretary")
    const param = await bindJson(req, Param)

    let announcement = await db().query.Announcement.findFirst({
      where: eq(Announcement.id, params.id),
    })
    if (!announcement)
      return sendErrors(404, errorDefinition.announcement_not_found)

    announcement.title = param.title
    announcement.content = param.content
    announcement.announcementCategoryId = param.announcement_category_id

    await db()
      .update(Announcement)
      .set(announcement)
      .where(eq(Announcement.id, params.id))

    return sendData(200, toAnnouncementResponse(announcement))
  },
)
