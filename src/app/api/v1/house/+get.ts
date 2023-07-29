import { db } from "@/server/db"
import { toHouseResponse } from "@/server/models/responses/house"
import { defineHandler } from "@/server/utils/web/handler"
import { sendData } from "@/server/utils/web/response"

export const GET = defineHandler(async () => {
  let houses = await db.query.House.findMany()
  return sendData(200, houses.map(toHouseResponse))
})
