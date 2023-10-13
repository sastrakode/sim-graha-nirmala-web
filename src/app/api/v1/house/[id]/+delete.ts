import { errorDefinition } from "@/lib/constants"
import { db } from "@/server/db"
import { House } from "@/server/db/schema"
import { useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { sendErrors, sendNoContent } from "@/server/web/response"
import { eq } from "drizzle-orm"

export const DELETE = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    useAuth(req, {
      staff: ["admin"],
    })

    let house = await db().query.House.findFirst({
      where: eq(House.id, params.id),
    })
    if (!house) return sendErrors(404, errorDefinition.house_not_found)

    await db().delete(House).where(eq(House.id, params.id))
    return sendNoContent()
  },
)
