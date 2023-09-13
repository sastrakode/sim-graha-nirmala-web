import { errorDefinition } from "@/lib/constants"
import { db } from "@/server/db"
import { AnnouncementCategory } from "@/server/db/schema"
import { defineHandler } from "@/server/web/handler"
import { sendErrors, sendNoContent } from "@/server/web/response"
import { eq } from "drizzle-orm"
import { revalidateTag } from "next/cache"

export const DELETE = defineHandler(
  async (_, { params }: { params: { id: number } }) => {
    let announcementCategory = await db().query.AnnouncementCategory.findFirst({
      where: eq(AnnouncementCategory.id, params.id),
    })
    if (!announcementCategory)
      return sendErrors(404, errorDefinition.announcement_category_not_found)

    await db()
      .delete(AnnouncementCategory)
      .where(eq(AnnouncementCategory.id, params.id))

    revalidateTag("announcementCategory")
    return sendNoContent()
  },
)
