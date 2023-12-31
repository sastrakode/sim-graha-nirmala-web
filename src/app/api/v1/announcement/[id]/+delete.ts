import { errorDefinition } from "@/lib/constants"
import { db } from "@/server/db"
import { Announcement } from "@/server/db/schema"
import { useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { sendErrors, sendNoContent } from "@/server/web/response"
import { eq } from "drizzle-orm"

export const DELETE = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    useAuth(req, {
      staff: ["admin", "secretary"],
    })

    let announcement = await db().query.Announcement.findFirst({
      where: eq(Announcement.id, params.id),
    })
    if (!announcement)
      return sendErrors(404, errorDefinition.announcement_not_found)

    await db().delete(Announcement).where(eq(Announcement.id, params.id))

    return sendNoContent()
  },
)
