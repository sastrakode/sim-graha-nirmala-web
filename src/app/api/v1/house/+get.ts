import { db } from "@/server/db"
import { House, Occupant, TOccupant } from "@/server/db/schema"
import { HouseResponse, toHouseResponse } from "@/server/models/responses/house"
import {
  OccupantResponse,
  toOccupantResponse,
} from "@/server/models/responses/occupant"
import { defineHandler } from "@/server/web/handler"
import { sendData } from "@/server/web/response"
import { and, eq } from "drizzle-orm"
import { alias } from "drizzle-orm/pg-core"

type Response = HouseResponse & {
  owner: OccupantResponse | null
  renter: OccupantResponse | null
}

const Owner = alias(Occupant, "owner")
const Renter = alias(Occupant, "renter")

export const GET = defineHandler(async () => {
  const houses = await db()
    .select()
    .from(House)
    .leftJoin(Owner, and(eq(House.id, Owner.houseId), eq(Owner.role, "owner")))
    .leftJoin(
      Renter,
      and(eq(House.id, Renter.houseId), eq(Renter.role, "renter")),
    )

  const responses: Response[] = houses.map((house) => {
    const response: Response = toHouseResponse(house.house) as Response
    response.owner = toOccupantResponse(house.owner as TOccupant)
    response.renter = toOccupantResponse(house.renter as TOccupant)
    return response
  })

  return sendData(200, responses)
})
