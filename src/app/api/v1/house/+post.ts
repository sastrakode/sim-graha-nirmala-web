import { db } from "@/server/db"
import { House, TInsertHouse } from "@/server/db/schema"
import { toHouseResponse } from "@/server/models/responses/house"
import { useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"
import { revalidateTag } from "next/cache"
import { z } from "zod"

const Param = z.object({
  code: z.string(),
  address: z.string(),
})

export const POST = defineHandler(async (req) => {
  useAuth(req, "admin")
  const param = await bindJson(req, Param)

  let houseExist = await db().query.House.findFirst({
    where: eq(House.code, param.code),
  })
  if (houseExist) return sendErrors(409, "House already exist")

  let house: TInsertHouse = {
    code: param.code,
    address: param.address,
  }

  let [newHouse] = await db().insert(House).values(house).returning()
  revalidateTag("house")
  return sendData(201, toHouseResponse(newHouse))
})
