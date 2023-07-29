import { db } from "@/server/db"
import { Role } from "@/server/db/schema"
import { defineHandler } from "@/server/web/handler"
import { sendErrors, sendNoContent } from "@/server/web/response"
import { eq } from "drizzle-orm"

export const DELETE = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    let role = await db.query.Role.findFirst({
      where: eq(Role.id, params.id),
    })
    if (!role) return sendErrors(404, "Role not found")

    await db.delete(Role).where(eq(Role.id, params.id))
    return sendNoContent()
  }
)
