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
        return NextResponse.redirect(new URL("/login", req.url))
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
          return NextResponse.redirect(new URL("/app/dashboard", req.url))
      } catch (error) {
        req.cookies.delete(token)
        return NextResponse.redirect(new URL("/admin/login", req.url))
      }
    }

    return NextResponse.redirect(new URL("/admin/login", req.url))
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
