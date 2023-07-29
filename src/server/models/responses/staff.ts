import { _Role, _Staff } from "../../db/schema"

export type StaffResponse = {
  id: number
  role_id: number
  name: string
  email: string
  phone: string
  created_at: Date
  updated_at: Date | null
}

export function toStaffResponse(staff?: _Staff): StaffResponse | null {
  return staff
    ? {
        id: staff.id,
        role_id: staff.roleId,
        name: staff.name,
        email: staff.email,
        phone: staff.phone,
        created_at: staff.createdAt,
        updated_at: staff.updatedAt,
      }
    : null
}
