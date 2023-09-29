import jwt from "jsonwebtoken"
import { config } from "../config"
import { Role, RoleType, throwUnauthorized } from "./auth"
import { NextRequest } from "next/server"

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

export function getToken(req: NextRequest): string {
  let token: string | undefined
  let authorization = req.headers.get("authorization")

  // If server-side rendering we'll get the token from authorizationn header
  // If client-side rendering we'll get the token directly via req.cookies() that bring cookies from client

  // Server-side cannot send the cookie to the Request since it's not from the browser
  // Client-side cannot get cookie to set auth header because the token cookie is httpOnly

  if (authorization) {
    token = authorization.split(" ")[1]
  } else {
    token = req.cookies.get("token")?.value
  }

  if (!token) {
    throwUnauthorized()
  }

  return token
}
