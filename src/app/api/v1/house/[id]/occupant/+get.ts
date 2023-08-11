import { db } from "@/server/db"
import { House, Occupant } from "@/server/db/schema"
import {
  OccupantResponse,
  toOccupantResponse,
} from "@/server/models/responses/occupant"
import { defineHandler } from "@/server/web/handler"
import { sendData, sendErrors } from "@/server/web/response"
import { and, eq } from "drizzle-orm"

type Response = {
  owner: OccupantResponse | null
  renter: OccupantResponse | null
}

export const GET = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    const house = await db().query.House.findFirst({
      where: eq(House.id, params.id),
    })
    if (!house) return sendErrors(404, "House not found")

    const owner = await db().query.Occupant.findFirst({
      where: and(eq(Occupant.houseId, params.id), eq(Occupant.role, "owner")),
    })

    const renter = await db().query.Occupant.findFirst({
      where: and(eq(Occupant.houseId, params.id), eq(Occupant.role, "renter")),
    })

    const response: Response = {
      owner: toOccupantResponse(owner),
      renter: toOccupantResponse(renter),
    }

    return sendData(200, response)
  },
)
