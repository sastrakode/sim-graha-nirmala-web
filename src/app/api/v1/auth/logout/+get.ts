import { defineHandler } from "@/server/web/handler"
import { sendNoContent } from "@/server/web/response"

export const GET = defineHandler(async (req) => {
  const res = sendNoContent()
  req.cookies.getAll().forEach((cookie) => {
    res.cookies.delete(cookie.name)
  })

  return res
})
