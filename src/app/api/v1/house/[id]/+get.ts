import { db } from "@/server/db"
import { House } from "@/server/db/schema"
import { toHouseResponse } from "@/server/models/responses/house"
import { defineHandler } from "@/server/utils/web/handler"
import { sendData, sendErrors } from "@/server/utils/web/response"
import { eq } from "drizzle-orm"

export const GET = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    let house = await db.query.House.findFirst({
      where: eq(House.id, params.id),
    })
    if (!house) return sendErrors(404, "House not found")

    return sendData(200, toHouseResponse(house))
  }
)
