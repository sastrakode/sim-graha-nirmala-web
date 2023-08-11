import { getCookie } from "cookies-next"

const baseURL = "http://localhost:3000/api/v1"
const isServer = typeof window === "undefined"

const getToken = async () => {
  let token: string
  if (isServer) {
    const { cookies } = await import("next/headers")
    token = `Bearer ${cookies().get("token")?.value}`
  } else {
    token = String(getCookie("token"))
  }
  return token
}

export async function occupantLogin(body: {}) {
  const res = await fetch(`${baseURL}/auth/occupant/login`, {
    method: "POST",
    body: JSON.stringify(body),
  })

  return res.json()
}

export async function getOccupant(id: string) {
  const token = await getToken()
  if (token) {
    try {
      const res = await fetch(`${baseURL}/occupant/${id}`, {
        headers: {
          Authorization: token,
        },
      })

      return res.json()
    } catch (error) {
      console.log(error)
    }
  }
}
