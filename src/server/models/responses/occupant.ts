import { TOccupant } from "@/server/db/schema"

export type OccupantResponse = {
  id: number
  name: string
  role: string
  createdAt: Date
  updatedAt: Date | null
  houseId: number
  email: string | null
  phone: string
}

export function toOccupantResponse(
  occupant?: TOccupant
): OccupantResponse | null {
  return occupant
    ? {
        id: occupant.id,
        role: occupant.role,
        name: occupant.name,
        houseId: occupant.houseId,
        email: occupant.email,
        phone: occupant.phone,
        createdAt: occupant.createdAt,
        updatedAt: occupant.updatedAt,
      }
    : null
}
