import { getCookie } from "cookies-next"
import { House, Occupant, OccupantLogin } from "./model"

const baseURL = "http://localhost:3000/api/v1"
const isServer = typeof window === "undefined"

export const fetchErrorString = "errors"

interface FetchError {
  errors: string[]
}

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

async function handleFetch<T>(
  url: string,
  requestOptions?: RequestInit,
): Promise<T | FetchError> {
  try {
    const res = await fetch(url, requestOptions)

    const resJson = await res.json()

    // Sometimes we need errors fields (example: login)
    if (!res.ok) {
      if (resJson.errors) return { errors: resJson.errors }
      else {
        throw new Error("Something went wrong")
      }
    }

    return resJson.data
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

export async function occupantLogin(body: {}): Promise<
  OccupantLogin | FetchError
> {
  const res = await handleFetch<OccupantLogin>(
    `${baseURL}/auth/occupant/login`,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
  )

  return res
}

export async function getHouse(id: string): Promise<House | FetchError> {
  const res = await handleFetch<House>(`${baseURL}/house/${id}`)
  return res
}

export async function getOccupant(id: string): Promise<Occupant | FetchError> {
  const token = await getToken()

  const res = await handleFetch<Occupant>(`${baseURL}/occupant/${id}`, {
    headers: {
      Authorization: token,
    },
  })

  return res
}
