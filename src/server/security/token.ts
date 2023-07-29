import jwt from "jsonwebtoken"
import { config } from "../config"

type Claim = {
  sub: string
  exp: number
  role: string
}

export function generateToken(claim: { sub: string; role: string }) {
  return jwt.sign(
    {
      sub: claim.sub,
      role: claim.role,
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  )
}
