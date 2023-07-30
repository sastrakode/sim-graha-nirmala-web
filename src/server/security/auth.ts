import { ApiError } from "../models/exceptions/api"
import { getToken, verifyToken } from "./token"

export type Role =
  | "admin"
  | "secretary"
  | "treasurer"
  | "security_guard"
  | "owner"
  | "renter"

export function useAuth(...roles: Role[]) {
  const token = getToken()
  const claim = verifyToken(token)
  for (const role of roles) {
    if (claim.role === role) return
  }
  throwUnauthorized()
}

export function throwUnauthorized(): never {
  throw new ApiError(401, "Unauthorized")
}
