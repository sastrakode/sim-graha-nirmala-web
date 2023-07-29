import { _House } from "../../db/schema"

export type HouseResponse = {
  id: number
  code: string
  created_at: Date
  updated_at: Date | null
}

export function toHouseResponse(house?: _House): HouseResponse | null {
  return house
    ? {
        id: house.id,
        code: house.code,
        created_at: house.createdAt,
        updated_at: house.updatedAt,
      }
    : null
}
