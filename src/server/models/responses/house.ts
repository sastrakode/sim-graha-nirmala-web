import { THouse } from "../../db/schema"

export type HouseResponse = {
  id: number
  code: string
  address: string
  created_at: Date
  updated_at: Date | null
}

export function toHouseResponse(house?: THouse): HouseResponse | null {
  return house
    ? {
        id: house.id,
        code: house.code,
        address: house.address,
        created_at: house.createdAt,
        updated_at: house.updatedAt,
      }
    : null
}
