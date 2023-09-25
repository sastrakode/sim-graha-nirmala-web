import { errorDefinition } from "@/lib/constants"
import { db } from "@/server/db"
import { Occupant, OccupantDocument } from "@/server/db/schema"
import { toStorageResponse } from "@/server/models/responses/storage"
import { useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { sendData, sendErrors } from "@/server/web/response"
import { and, desc, eq } from "drizzle-orm"

export const GET = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    useAuth(req)

    const occupant = await db().query.Occupant.findFirst({
      where: eq(Occupant.id, params.id),
    })
    if (!occupant) return sendErrors(404, errorDefinition.occupant_not_found)

    const occupantDocument = await db().query.OccupantDocument.findFirst({
      with: {
        storage: true,
      },
      where: and(
        eq(OccupantDocument.occupantId, params.id),
        eq(OccupantDocument.type, "family_card"),
      ),
      orderBy: desc(OccupantDocument.id),
    })
    if (!occupantDocument || !occupantDocument.storage) {
      return sendErrors(404, { message: "Family card not found" })
    }

    return sendData(200, await toStorageResponse(occupantDocument.storage))
  },
)
