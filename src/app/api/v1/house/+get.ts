import { db } from "@/server/db"
import { House, Owner, Renter } from "@/server/db/schema"
import { HouseResponse, toHouseResponse } from "@/server/models/responses/house"
import {
  OccupantResponse,
  toOccupantResponse,
} from "@/server/models/responses/occupant"
import { defineHandler } from "@/server/web/handler"
import { sendData } from "@/server/web/response"
import { and, eq } from "drizzle-orm"

type Response = {
  house: HouseResponse
  owner: OccupantResponse | null
  renter: OccupantResponse | null
}

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
    return {
      house: toHouseResponse(house.house),
      owner: toOccupantResponse(house.owner),
      renter: toOccupantResponse(house.renter),
    } as Response
  })

  return sendData(200, responses)
})
