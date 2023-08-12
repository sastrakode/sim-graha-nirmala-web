import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    let hasToken = req.cookies.has("token")

    if (hasToken) return NextResponse.next()

    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (req.nextUrl.pathname.startsWith("/login")) {
    let hasToken = req.cookies.has("token")

    if (hasToken) return NextResponse.redirect(new URL("/dashboard", req.url))

    return NextResponse.next()
  }
}
