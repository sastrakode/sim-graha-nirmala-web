import { minioClient, storeObject } from "@/server/providers/minio"
import {
  getCurrentOccupant,
  throwUnauthorized,
  useAuth,
} from "@/server/security/auth"
import { defineHandler } from "@/server/web/handler"
import { sendData, sendErrors } from "@/server/web/response"
import { da } from "date-fns/locale"

export const POST = defineHandler(
  async (req, { params }: { params: { id: number } }) => {
    // useAuth(req, "owner", "renter")
    // const occupant = await getCurrentOccupant(req)
    // if (occupant.id !== params.id) {
    //   throwUnauthorized()
    // }

    // const formData = await req.formData()
    // const file = formData.get("file")
    // if (!file) return sendErrors(400, { message: "Please upload file" })

    // await storeObject(file as File)

    let error, data: any

    minioClient().presignedGetObject("mymusic", "main.go", (err, result) => {
      error = err
      data = result
      console.log("error:", error)
      console.log("result:", data)
    })

    return sendData(200, {
      err: error,
      result: data,
    })
  },
)
