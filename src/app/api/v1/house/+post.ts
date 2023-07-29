import { db } from "@/server/db"
import { House, _InsertHouse } from "@/server/db/schema"
import { toHouseResponse } from "@/server/models/responses/house"
import { useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"
import { z } from "zod"

const Param = z.object({
  code: z.string(),
})

export const POST = defineHandler(async (req) => {
  useAuth("admin")

  const param = await bindJson(req, Param)
  let houseExist = await db.query.House.findFirst({
    where: eq(House.code, param.code),
  })
  if (houseExist) return sendErrors(409, "House already exist")

  let house: _InsertHouse = {
    code: param.code,
  }

  let [newHouse] = await db.insert(House).values(house).returning()
  return sendData(201, toHouseResponse(newHouse))
})
