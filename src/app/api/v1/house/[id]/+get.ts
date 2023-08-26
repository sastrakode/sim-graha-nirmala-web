import { errorDefinition } from "@/lib/constants"
import { db } from "@/server/db"
import { House } from "@/server/db/schema"
import { toHouseResponse } from "@/server/models/responses/house"
import { defineHandler } from "@/server/web/handler"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"

export const GET = defineHandler(
  async (_, { params }: { params: { id: number } }) => {
    let house = await db().query.House.findFirst({
      where: eq(House.id, params.id),
    })
    if (!house) return sendErrors(404, errorDefinition.house_not_found)

    return sendData(200, toHouseResponse(house))
  },
)
