import { errorDefinition } from "@/lib/constants"
import { db } from "@/server/db"
import { Staff } from "@/server/db/schema"
import { useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { sendErrors, sendNoContent } from "@/server/web/response"
import { eq } from "drizzle-orm"

export const DELETE = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    useAuth(req, "admin")

    let staff = await db().query.Staff.findFirst({
      where: eq(Staff.id, params.id),
    })
    if (!staff) return sendErrors(404, errorDefinition.staff_not_found)

    await db().delete(Staff).where(eq(Staff.id, params.id))
    return sendNoContent()
  },
)
