import { db } from "@/server/db"
import { House, Occupant } from "@/server/db/schema"
import { toOccupantResponse } from "@/server/models/responses/occupant"
import { useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { bindJson } from "@/server/web/request"
import { sendData, sendErrors } from "@/server/web/response"
import { eq } from "drizzle-orm"
import { z } from "zod"

const Param = z.object({
  house_id: z.number(),
  name: z.string(),
  email: z.string().nullable(),
  phone: z.string(),
})

export const PUT = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    useAuth(req, "admin", "owner", "renter")

    let param = await bindJson(req, Param)

    const isHouseExists = await db().query.House.findFirst({
      where: eq(House.id, param.house_id),
    })
    if (!isHouseExists) return sendErrors(404, "House not found")

    let houseBelongToSomeone = await db().query.Occupant.findFirst({
      where: eq(Occupant.houseId, param.house_id),
    })
    if (houseBelongToSomeone) return sendErrors(409, "House belong to someone")

    if (param.email) {
      let occupantExists = await db().query.Occupant.findFirst({
        where: eq(Occupant.email, param.email),
      })
      if (occupantExists) return sendErrors(409, "Email already registered")
    }

    let phoneExists = await db().query.Occupant.findFirst({
      where: eq(Occupant.phone, param.phone),
    })
    if (phoneExists) return sendErrors(409, "Phone Number already registered")

    let occupant = await db().query.Occupant.findFirst({
      where: eq(Occupant.id, params.id),
    })
    if (!occupant) return sendErrors(404, "Occupant not found")

    occupant.houseId = param.house_id
    occupant.name = param.name
    occupant.email = param.email
    occupant.phone = param.phone
    return sendData(200, toOccupantResponse(occupant))
  },
)
