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

export const staffRoleTypes: readonly {
  key: string
  name: string
}[] = [
  { key: "admin", name: "Admin" },
  { key: "treasurer", name: "Bendahara" },
  { key: "secretary", name: "Sekretaris" },
  { key: "security_guard", name: "Security" },
]

export const occupantRoleTypes: readonly {
  key: string
  name: string
}[] = [
  { key: "owner", name: "Pemilik" },
  { key: "renter", name: "Penyewa" },
]
