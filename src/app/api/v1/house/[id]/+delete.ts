import { db } from "@/server/db"
import { House } from "@/server/db/schema"
import { defineHandler } from "@/server/utils/web/handler"
import { sendErrors, sendNoContent } from "@/server/utils/web/response"
import { eq } from "drizzle-orm"

export const DELETE = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    let house = await db.query.House.findFirst({
      where: eq(House.id, params.id),
    })
    if (!house) return sendErrors(404, "House not found")

    await db.delete(House).where(eq(House.id, params.id))
    return sendNoContent()
  }
)
