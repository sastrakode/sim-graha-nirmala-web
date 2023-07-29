import { _Role } from "../../db/schema"

export type RoleResponse = {
  id: number
  code: string
  name: string
  created_at: Date
  updated_at: Date | null
}

export function toRoleResponse(role?: _Role): RoleResponse | null {
  return role
    ? {
        id: role.id,
        code: role.code,
        name: role.name,
        created_at: role.createdAt,
        updated_at: role.updatedAt,
      }
    : null
}
