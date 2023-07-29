import { db } from "@/server/db"
import { Role, Staff } from "@/server/db/schema"
import { defineHandler } from "@/server/web/handler"
import { sendErrors, sendNoContent } from "@/server/web/response"
import { eq } from "drizzle-orm"

export const DELETE = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    let staff = await db.query.Staff.findFirst({
      where: eq(Role.id, params.id),
    })
    if (!staff) return sendErrors(404, "Staff not found")

    await db.delete(Staff).where(eq(Staff.id, params.id))
    return sendNoContent()
  }
)
