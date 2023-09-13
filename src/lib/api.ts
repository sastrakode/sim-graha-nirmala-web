import { getCookie } from "cookies-next"
import { OccupantLogin, StaffLogin } from "./model"
import { AnnouncementResponse } from "@/server/models/responses/announcement"
import { StaffResponse } from "@/server/models/responses/staff"
import { AnnouncementCategoryResponse } from "@/server/models/responses/announcement-category"
import { HouseResponse } from "@/server/models/responses/house"
import { OccupantResponse } from "@/server/models/responses/occupant"
import { TransactionResponse } from "@/server/models/responses/transaction"
import { BillingResponse } from "@/server/models/responses/billing"
import { TInsertPayment } from "@/server/db/schema"

const isServer = typeof window === "undefined"
const baseURL = isServer ? "http://127.0.0.1:3000/api/v1" : "/api/v1"

const getToken = async () => {
  let token: string
  if (isServer) {
    // The route that needs server-side cookies, will not be cached
    const { cookies } = await import("next/headers")
    token = `Bearer ${cookies().get("token")?.value}`
  } else {
    token = `Bearer ${String(getCookie("token"))}`
  }
  return token
}

export type FetchError = { field?: string; message: string }[] | null

async function handleFetch<T>(
  url: string,
  requestOptions?: RequestInit,
): Promise<[T, FetchError]> {
  try {
    const res = await fetch(url, requestOptions)

    const resJson = await res.json()

    if (!res.ok) {
      if (resJson.errors) return [null as T, resJson.errors]

      throw new Error("Something went wrong")
    }

    return [resJson.data, null]
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

async function handleFetchNoContent(url: string, requestOptions?: RequestInit) {
  try {
    const res = await fetch(url, requestOptions)

    if (!res.ok) {
      const resJson = await res.json()

      if (resJson.errors) throw new Error(resJson.errors[0].message)
    }
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

export async function occupantLogin(body: {}): Promise<
  [OccupantLogin, FetchError]
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

export async function staffLogin(body: {}): Promise<[StaffLogin, FetchError]> {
  const res = await handleFetch<StaffLogin>(`${baseURL}/auth/staff/login`, {
    method: "POST",
    body: JSON.stringify(body),
  })

  return res
}

export async function getHouse(
  id: string,
): Promise<[HouseResponse, FetchError]> {
  const res = await handleFetch<HouseResponse>(`${baseURL}/house/${id}`, {
    next: {
      tags: ["house"],
    },
  })
  return res
}

export async function getHouses(): Promise<[HouseResponse[], FetchError]> {
  const res = await handleFetch<HouseResponse[]>(`${baseURL}/house`, {
    next: {
      tags: ["house"],
    },
  })
  return res
}

export async function postHouse(body: {}): Promise<
  [HouseResponse, FetchError]
> {
  const token = await getToken()

  const res = await handleFetch<HouseResponse>(`${baseURL}/house`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Authorization: token,
    },
  })

  return res
}

export async function putHouse(
  id: string,
  body: {},
): Promise<[HouseResponse, FetchError]> {
  const token = await getToken()

  const res = await handleFetch<HouseResponse>(`${baseURL}/house/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Authorization: token,
    },
  })

  return res
}

export async function deleteHouse(
  id: number,
): Promise<[StaffResponse, FetchError]> {
  const token = await getToken()

  const res = await handleFetch<StaffResponse>(`${baseURL}/house/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
  return res
}

export async function getOccupant(
  id: string,
): Promise<[OccupantResponse, FetchError]> {
  const token = await getToken()

  const res = await handleFetch<OccupantResponse>(`${baseURL}/occupant/${id}`, {
    headers: {
      Authorization: token,
    },
  })

  return res
}

export async function getOccupants(): Promise<
  [OccupantResponse[], FetchError]
> {
  const token = await getToken()

  const res = await handleFetch<OccupantResponse[]>(`${baseURL}/occupant`, {
    headers: {
      Authorization: token,
    },
  })
  return res
}

export async function postOccupant(body: {}): Promise<
  [OccupantResponse, FetchError]
> {
  const token = await getToken()

  const res = await handleFetch<OccupantResponse>(`${baseURL}/occupant`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Authorization: token,
    },
  })

  return res
}

export async function putOccupant(
  id: string,
  body: {},
): Promise<[OccupantResponse, FetchError]> {
  const token = await getToken()

  const res = await handleFetch<OccupantResponse>(`${baseURL}/occupant/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Authorization: token,
    },
  })
  return res
}

export async function deleteOccupant(
  id: number,
): Promise<[OccupantResponse, FetchError]> {
  const token = await getToken()

  const res = await handleFetch<OccupantResponse>(`${baseURL}/occupant/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
  return res
}

export async function getStaff(
  id: string,
): Promise<[StaffResponse, FetchError]> {
  const token = await getToken()

  const res = await handleFetch<StaffResponse>(`${baseURL}/staff/${id}`, {
    headers: {
      Authorization: token,
    },
  })

  return res
}

export async function getStaffs(): Promise<[StaffResponse[], FetchError]> {
  const token = await getToken()

  const res = await handleFetch<StaffResponse[]>(`${baseURL}/staff`, {
    headers: {
      Authorization: token,
    },
  })
  return res
}

export async function postStaff(body: {}): Promise<
  [StaffResponse, FetchError]
> {
  const token = await getToken()

  const res = await handleFetch<StaffResponse>(`${baseURL}/staff`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Authorization: token,
    },
  })
  return res
}

export async function putStaff(
  id: string,
  body: {},
): Promise<[StaffResponse, FetchError]> {
  const token = await getToken()

  const res = await handleFetch<StaffResponse>(`${baseURL}/staff/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Authorization: token,
    },
  })
  return res
}

export async function deleteStaff(
  id: number,
): Promise<[StaffResponse, FetchError]> {
  const token = await getToken()

  const res = await handleFetch<StaffResponse>(`${baseURL}/staff/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
  return res
}

export async function getAnnouncements(): Promise<
  [AnnouncementResponse[], FetchError]
> {
  const res = await handleFetch<AnnouncementResponse[]>(
    `${baseURL}/announcement`,
    {
      next: {
        tags: ["announcement"],
      },
    },
  )

  return res
}

export async function getAnnouncement(
  id: string,
): Promise<[AnnouncementResponse, FetchError]> {
  const token = await getToken()

  const res = await handleFetch<AnnouncementResponse>(
    `${baseURL}/announcement/${id}`,
    {
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["announcement"],
      },
    },
  )

  return res
}

export async function postAnnouncement(body: {}): Promise<
  [AnnouncementResponse, FetchError]
> {
  const token = await getToken()

  const res = await handleFetch<AnnouncementResponse>(
    `${baseURL}/announcement`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: token,
      },
    },
  )

  return res
}

export async function putAnnouncement(
  id: string,
  body: {},
): Promise<[AnnouncementResponse, FetchError]> {
  const token = await getToken()

  const res = await handleFetch<AnnouncementResponse>(
    `${baseURL}/announcement/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        Authorization: token,
      },
    },
  )

  return res
}

export async function deleteAnnouncement(id: number) {
  const token = await getToken()

  await handleFetchNoContent(`${baseURL}/announcement/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
}

export async function getAnnouncementCategories(): Promise<
  [AnnouncementCategoryResponse[], FetchError]
> {
  const res = await handleFetch<AnnouncementCategoryResponse[]>(
    `${baseURL}/announcement/category`,
    {
      next: {
        tags: ["announcementCategory"],
      },
    },
  )

  return res
}

export async function postAnnouncementCategory(body: {}): Promise<
  [AnnouncementCategoryResponse, FetchError]
> {
  const res = await handleFetch<AnnouncementCategoryResponse>(
    `${baseURL}/announcement/category`,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
  )

  return res
}

export async function getTransaction(): Promise<
  [TransactionResponse, FetchError]
> {
  const token = await getToken()

  const res = await handleFetch<TransactionResponse>(`${baseURL}/transaction`, {
    headers: {
      Authorization: token,
    },
  })

  return res
}

export async function getBills(
  houseId: string,
): Promise<[BillingResponse[], FetchError]> {
  const token = await getToken()

  const res = await handleFetch<BillingResponse[]>(
    `${baseURL}/house/${houseId}/billing`,
    {
      headers: {
        Authorization: token,
      },
    },
  )

  return res
}

export async function payBill(
  id: number,
): Promise<[TInsertPayment, FetchError]> {
  const token = await getToken()

  const res = await handleFetch<TInsertPayment>(
    `${baseURL}/billing/${id}/pay/transfer`,
    {
      headers: {
        Authorization: token,
      },
    },
  )

  return res
}
