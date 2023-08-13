import jwt from "jsonwebtoken"
import { config } from "../config"
import { Role, RoleType, throwUnauthorized } from "./auth"

type Claim = {
  sub: string
  exp: number
  role: Role
}

export function generateToken(claim: {
  sub: string
  role: Role
  roleType: RoleType
}) {
  return jwt.sign(
    {
      sub: claim.sub,
      role: claim.role,
      role_type: claim.roleType,
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn },
  )
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, config.jwt.secret) as Claim
  } catch (error) {
    throwUnauthorized()
  }
}

export function getToken(req: Request) {
  let authorization = req.headers.get("authorization")
  if (!authorization) {
    throwUnauthorized()
  }

  let [_type, token] = authorization.split(" ")
  return token
}
