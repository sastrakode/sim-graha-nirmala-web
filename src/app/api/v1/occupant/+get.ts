import { db } from "@/server/db"
import { toOccupantResponse } from "@/server/models/responses/occupant"
import { useAuth } from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { sendData } from "@/server/web/response"

export const GET = defineHandler(async (req) => {
  useAuth(req, "admin")

  let occupants = await db().query.Occupant.findMany()
  return sendData(200, occupants.map(toOccupantResponse))
})
