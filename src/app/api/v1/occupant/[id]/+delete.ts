import { errorDefinition } from "@/lib/constants"
import { db } from "@/server/db"
import { Occupant } from "@/server/db/schema"
import { useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { sendErrors, sendNoContent } from "@/server/web/response"
import { eq } from "drizzle-orm"

export const DELETE = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    useAuth(req, "admin")

    let occupant = await db().query.Occupant.findFirst({
      where: eq(Occupant.id, params.id),
    })
    if (!occupant) return sendErrors(404, errorDefinition.occupant_not_found)

    await db().delete(Occupant).where(eq(Occupant.id, params.id))
    return sendNoContent()
  },
)
