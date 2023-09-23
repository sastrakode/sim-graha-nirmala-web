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
  transaction: "/admin/transaction",
  bill: "/admin/bill",
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

type errorKeyType =
  | "house_taken"
  | "email_registered"
  | "phone_registered"
  | "house_not_found"
  | "occupant_not_found"
  | "phone_not_registered"
  | "password_incorrect"
  | "house_code_registered"
  | "staff_not_found"
  | "announcement_not_found"
  | "announcement_category_exist"
  | "announcement_category_not_found"
  | "billing_not_found"

export const errorDefinition: {
  [key in errorKeyType]: { field?: string; message: string }
} = {
  house_not_found: {
    message: "Rumah tidak ada",
  },
  house_taken: {
    field: "phone",
    message: "Rumah sudah diisi",
  },
  email_registered: {
    field: "phone",
    message: "Email sudah terdaftar",
  },
  phone_registered: {
    field: "phone",
    message: "No. Telp sudah terdaftar",
  },
  occupant_not_found: {
    message: "Penghuni tidak ditemukan",
  },
  phone_not_registered: {
    field: "phone",
    message: "No. Telp belum terdaftar",
  },
  password_incorrect: {
    field: "password",
    message: "Password salah",
  },
  house_code_registered: {
    field: "code",
    message: "Kode rumah sudah terdaftar",
  },
  staff_not_found: {
    message: "Staf tidak ditemukan",
  },
  announcement_not_found: {
    message: "Pengumuman tidak ditemukan",
  },
  announcement_category_exist: {
    field: "name",
    message: "Kategori pengumuman sudah ada",
  },
  announcement_category_not_found: {
    message: "Kategori pengumuman tidak ditemukan",
  },
  billing_not_found: {
    message: "Tagihan tidak ditemukan",
  },
}
