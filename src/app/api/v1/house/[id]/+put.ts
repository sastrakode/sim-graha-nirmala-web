import { db } from "@/server/db"
import { House } from "@/server/db/schema"
import { toHouseResponse } from "@/server/models/responses/house"
import { defineHandler } from "@/server/utils/web/handler"
import { bindJson } from "@/server/utils/web/request"
import { sendData, sendErrors } from "@/server/utils/web/response"
import { eq } from "drizzle-orm"
import { z } from "zod"

const Param = z.object({
  code: z.string(),
})

export const PUT = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    let param = await bindJson(req, Param)
    let house = await db.query.House.findFirst({
      where: eq(House.id, params.id),
    })
    if (!house) return sendErrors(404, "House not found")

    house.code = param.code
    house.updatedAt = new Date()

    await db.update(House).set(house).where(eq(House.id, params.id))
    return sendData(200, toHouseResponse(house))
  }
)
