export const routeNames = {
  dashboard: "/app/dashboard",
  transaction: "/app/transaction",
  bill: "/app/bill",
  profile: "/app/profile",
}

export const adminRouteNames = {
  account: "/admin/account",
  house: "/admin/house",
  announcement: "/admin/announcement",
}

export const role: { [key: string]: string } = {
  owner: "Pemilik",
  renter: "Penyewa",
  admin: "Admin",
  treasurer: "Bendahara",
  secretary: "Sekretaris",
  security_guard: "Security",
}

export type staffRoleType =
  | "admin"
  | "secretary"
  | "treasurer"
  | "security_guard"

export const staffRoleTypes: readonly {
  key: staffRoleType
  name: string
}[] = [
  { key: "admin", name: "Admin" },
  { key: "treasurer", name: "Bendahara" },
  { key: "secretary", name: "Sekretaris" },
  { key: "security_guard", name: "Security" },
]

export type occupantRoleType = "owner" | "renter"

export const occupantRoleTypes: readonly {
  key: occupantRoleType
  name: string
}[] = [
  { key: "owner", name: "Pemilik" },
  { key: "renter", name: "Penyewa" },
]
