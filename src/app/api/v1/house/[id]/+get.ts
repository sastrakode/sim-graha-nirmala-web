import { errorDefinition } from "@/lib/constants"
import { db } from "@/server/db"
import { House, Occupant } from "@/server/db/schema"
import { toHouseResponse } from "@/server/models/responses/house"
import { defineHandler } from "@/server/web/handler"
import { sendData, sendErrors } from "@/server/web/response"
import { and, eq } from "drizzle-orm"

export const GET = defineHandler(
  async (_, { params }: { params: { id: number } }) => {
    let house = await db().query.House.findFirst({
      where: eq(House.id, params.id),
    })
    if (!house) return sendErrors(404, errorDefinition.house_not_found)

    const owner = await db().query.Occupant.findFirst({
      where: and(eq(Occupant.houseId, params.id), eq(Occupant.role, "owner")),
    })

    const renter = await db().query.Occupant.findFirst({
      where: and(eq(Occupant.houseId, params.id), eq(Occupant.role, "renter")),
    })

    return sendData(
      200,
      toHouseResponse(house, {
        owner: owner,
        renter: renter,
      }),
    )
  },
)
