import { NextRequest, NextResponse } from "next/server"

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

  if (req.nextUrl.pathname.startsWith("/logout")) {
    const response = NextResponse.redirect(new URL("/login", req.url))

    response.cookies.set("token", "", { expires: new Date(Date.now()) })
    response.cookies.set("userId", "", { expires: new Date(Date.now()) })

    return response
  }
}
