import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { parseJwt } from "./lib/utils"

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api")) return NextResponse.next()

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
        const response = NextResponse.next()
        response.cookies.delete("token")
        return response
      }
    }

    return NextResponse.next()
  }

  if (req.nextUrl.pathname.startsWith("/app")) {
    const token = req.cookies.get("token")?.value
    const houseId = req.cookies.get("houseId")?.value

    const response = NextResponse.redirect(new URL("/login", req.url))

    if (token && houseId) {
      try {
        const { role_type } = parseJwt(token)
        if (role_type === "occupant") return NextResponse.next()
        else if (role_type === "staff")
          return NextResponse.redirect(new URL("/admin", req.url))
      } catch (error) {
        const response = NextResponse.redirect(
          new URL("/login?cause=invalid_session", req.url),
        )
        response.cookies.delete("token")
        return response
      }
    } else {
      req.cookies.getAll().forEach((cookie) => {
        response.cookies.delete(cookie.name)
      })
    }

    return response
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value

    if (token) {
      try {
        const { role_type } = parseJwt(token)
        if (role_type === "staff") return NextResponse.next()
        else if (role_type === "occupant")
          return NextResponse.redirect(new URL("/app/dashboard", req.url))
      } catch (error) {
        const response = NextResponse.redirect(new URL("/admin/login", req.url))
        response.cookies.delete("token")
        return response
      }
    }

    return NextResponse.redirect(
      new URL("/admin/login?cause=invalid_session", req.url),
    )
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
