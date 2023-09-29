import { errorDefinition } from "@/lib/constants"
import { db } from "@/server/db"
import { Occupant, OccupantDocument } from "@/server/db/schema"
import { useAuth } from "@/server/security/auth"
import { getFile } from "@/server/storage"
import { defineHandler } from "@/server/web/handler"
import { sendErrors } from "@/server/web/response"
import { and, desc, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

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

    const file = await getFile(occupantDocument.storage)
    return new NextResponse(file)
  },
)
