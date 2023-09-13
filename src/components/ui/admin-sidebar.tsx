"use client"

import { usePathname } from "next/navigation"
import Icons from "./icons"
import LogoutButton from "./logout-button"
import NavItem from "./nav-item"

import { adminRouteNames } from "@/lib/constants"

const AdminSidebar = () => {
  const currentRoute = usePathname()
  return (
    <aside className="fixed z-10 bg-primary w-[15.5rem] text-center h-screen py-6 px-[1.15rem] hidden lg:flex lg:flex-col">
      <h3 className="text-white">SIMGN</h3>
      <div className="h-[3px] bg-slate-400 my-6" />
      <div className="flex flex-col space-y-3 text-white grow">
        <NavItem
          Icon={Icons.UserSquare2}
          isActive={currentRoute.includes(adminRouteNames.account)}
          routeName={adminRouteNames.account}
        >
          Akun
        </NavItem>
        <NavItem
          Icon={Icons.UserSquare2}
          isActive={currentRoute.includes(adminRouteNames.house)}
          routeName={adminRouteNames.house}
        >
          Rumah
        </NavItem>
        <NavItem
          Icon={Icons.UserSquare2}
          isActive={currentRoute.includes(adminRouteNames.announcement)}
          routeName={adminRouteNames.announcement}
        >
          Pengumuman
        </NavItem>
        <NavItem
          Icon={Icons.UserSquare2}
          isActive={currentRoute.includes(adminRouteNames.transaction)}
          routeName={adminRouteNames.transaction}
        >
          Transaksi
        </NavItem>
        <NavItem
          Icon={Icons.UserSquare2}
          isActive={currentRoute.includes(adminRouteNames.bill)}
          routeName={adminRouteNames.bill}
        >
          Tagihan
        </NavItem>
      </div>

      <LogoutButton className="w-full" />
    </aside>
  )
}

export default AdminSidebar
