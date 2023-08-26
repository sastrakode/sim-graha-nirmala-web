import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { parseJwt } from "./lib/utils"

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/admin/login")
  ) {
    let token = req.cookies.get("token")?.value
    if (token) {
      try {
        const { role_type } = parseJwt(token)
        if (role_type === "occupant")
          return NextResponse.redirect(new URL("/app/dashboard", req.url))
        else if (role_type === "staff")
          return NextResponse.redirect(new URL("/admin", req.url))
      } catch (error) {
        req.cookies.delete(token)
        return NextResponse.next()
      }
    }

    return NextResponse.next()
  }

  if (req.nextUrl.pathname.startsWith("/app")) {
    const token = req.cookies.get("token")?.value

    if (token) {
      try {
        const { role_type } = parseJwt(token)
        if (role_type === "occupant") return NextResponse.next()
        else if (role_type === "staff")
          return NextResponse.redirect(new URL("/admin", req.url))
      } catch (error) {
        req.cookies.delete(token)
        NextResponse.redirect(new URL("/login", req.url))
      }
    }

    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    let response: NextResponse
    const token = req.cookies.get("token")?.value

    if (token) {
      try {
        const { role_type } = parseJwt(token)
        if (role_type === "staff") return NextResponse.next()
        else if (role_type === "occupant")
          response = NextResponse.redirect(new URL("/app/dashboard", req.url))
      } catch (error) {
        req.cookies.delete(token)
        response = NextResponse.redirect(new URL("/admin/login", req.url))
      }
    }

    response = NextResponse.redirect(new URL("/admin/login", req.url))

    // Disable middleware cache so we can use router.push() without being cached
    response.headers.set("x-middleware-cache", "no-cache")
    return response
  }
}
