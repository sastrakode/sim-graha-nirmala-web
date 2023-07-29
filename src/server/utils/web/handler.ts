import { ApiError } from "@/server/models/exceptions/api"
import { NextRequest } from "next/server"
import { sendErrors, sendErrorServer } from "./response"

interface Handler<T = any> {
  (req: NextRequest, event: { params: any }): T
}

export function defineHandler(handler: Handler) {
  return async (req: NextRequest, event: { params: any }) => {
    try {
      return await handler(req, event)
    } catch (error) {
      if (error instanceof ApiError) {
        return sendErrors(error.code, error.errors)
      }

      return sendErrorServer()
    }
  }
}
