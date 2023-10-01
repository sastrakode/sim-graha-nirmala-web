"use client"

import { useParams, usePathname } from "next/navigation"

import LogoutDialog from "./logout-dialog"

const pageName: { [key: string]: string } = {
  "/app/dashboard": "Dashboard",
  "/app/transaction": "Transaksi",
  "/app/bill": "Tagihan",
  "/app/profile": "Profil",
  "/app/profile/family": "Daftar Keluarga",
  "/app/profile/family/add": "Tambah Keluarga",
  "/app/profile/family-card": "Kartu Keluarga",

  "/admin/account": "Kelola Akun",
  "/admin/account/staff/add": "Tambah Staf",
  "/admin/account/staff/edit": "Edit Staf",
  "/admin/account/occupant/add": "Tambah Penghuni",
  "/admin/account/occupant/edit": "Tambah Staf",
  "/admin/account/occupant/family": "Kelola Keluarga Penghuni",
  "/admin/account/occupant/family/add": "Tambah Anggota Keluarga Penghuni",

  "/admin/house": "Kelola Rumah",
  "/admin/house/add": "Tambah Rumah",
  "/admin/house/edit": "Edit Rumah",

  "/admin/announcement": "Kelola Pengumuman",
  "/admin/announcement/add": "Tambah Pengumuman",
  "/admin/announcement/edit": "Edit Pengumuman",

  "/admin/transaction": "Kelola Transaksi",
  "/admin/transaction/add": "Tambah Transaksi",
  "/admin/transaction/edit": "Edit Trannsaksi",

  "/admin/bill": "Kelola Tagihan",
}

const getRouteWithoutParams = (
  route: string,
  params: { [key: string]: string | string[] },
) => {
  if (route.length > 0) {
    for (const key in params) {
      let param = params[key]
      if (typeof param === "string") {
        route = route.replace(`/${param}`, "")
      } else {
        param.forEach((value) => {
          route = route.replace(`/${value}`, "")
        })
      }
    }
  }

  return route
}

const Navbar = () => {
  const currentRoute = usePathname()
  const params = useParams()
  return (
    <nav className="flex shadow-md bg-white sticky top-0 justify-between items-center p-6 z-50">
      <h4 className="text-primary">
        {pageName[getRouteWithoutParams(currentRoute, params)]}
      </h4>

      <LogoutDialog className="lg:hidden" />
    </nav>
  )
}

export default Navbar
