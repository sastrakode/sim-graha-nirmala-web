import { errorDefinition } from "@/lib/constants"
import { db } from "@/server/db"
import { House } from "@/server/db/schema"
import { toHouseResponse } from "@/server/models/responses/house"
import { useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"
import { z } from "zod"

const Param = z.object({
  code: z.string(),
  address: z.string(),
})

export const PUT = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    useAuth(req, {
      staff: ["admin"],
    })
    let param = await bindJson(req, Param)

    let houseExist = await db().query.House.findFirst({
      where: eq(House.code, param.code),
    })
    if (houseExist)
      return sendErrors(409, errorDefinition.house_code_registered)

    let house = await db().query.House.findFirst({
      where: eq(House.id, params.id),
    })
    if (!house) return sendErrors(404, errorDefinition.house_not_found)

    house.code = param.code
    house.address = param.address
    house.updatedAt = new Date()

    await db().update(House).set(house).where(eq(House.id, params.id))
    return sendData(200, toHouseResponse(house))
  },
)
