import { eq } from "drizzle-orm"
import { db } from "../db"
import { ApiError } from "../models/exceptions/api"
import { getToken, verifyToken } from "./token"
import { Occupant, Staff } from "../db/schema"

const claimSubHeader = "x-claim-sub"

export type Role =
  | "admin"
  | "secretary"
  | "treasurer"
  | "security_guard"
  | "owner"
  | "renter"

export type RoleType = "staff" | "occupant"

export function useAuth(req: Request, ...roles: Role[]) {
  const token = getToken(req)
  const claim = verifyToken(token)

  if (roles.length === 0) return
  for (const role of roles) {
    if (claim.role === role) {
      req.headers.set(claimSubHeader, claim.sub)
      return
    }
  }

  throwUnauthorized()
}

export function throwUnauthorized(): never {
  throw new ApiError(401, "Unauthorized")
}

export async function getCurrentStaff(req: Request) {
  const sub = req.headers.get(claimSubHeader)
  if (!sub) throwUnauthorized()

  const staff = await db().query.Staff.findFirst({
    where: eq(Staff.id, parseInt(sub)),
  })
  if (!staff) throwUnauthorized()

  return staff
}

export async function getCurrentOccupant(req: Request) {
  const sub = req.headers.get(claimSubHeader)
  if (!sub) throwUnauthorized()

  const occupant = await db().query.Occupant.findFirst({
    where: eq(Occupant.id, parseInt(sub)),
  })
  if (!occupant) throwUnauthorized()

  return occupant
}
