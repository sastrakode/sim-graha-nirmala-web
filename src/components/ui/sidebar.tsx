import Icons from "../icons"
import NavItem from "./nav-item"

import { routeNames } from "@/lib/constants"

const Sidebar = ({ currentRoute }: { currentRoute: string }) => {
  return (
    <div className="fixed z-10 bg-primary w-[15.5rem] text-center h-screen py-6 px-[1.15rem] hidden lg:block">
      <h3 className="text-white">SIMGN</h3>
      <div className="h-[3px] w-full bg-slate-400 my-6" />

      <div className="flex flex-col h-full space-y-3 text-white">
        <NavItem
          Icon={Icons.LayoutDashboard}
          isActive={currentRoute === routeNames.dashboard}
          routeName={routeNames.dashboard}
        >
          Dashboard
        </NavItem>
        <NavItem
          Icon={Icons.ArrowLeftRight}
          isActive={currentRoute === routeNames.transaction}
          routeName={routeNames.transaction}
        >
          Transaksi
        </NavItem>
        <NavItem
          Icon={Icons.Receipt}
          isActive={currentRoute === routeNames.bill}
          routeName={routeNames.bill}
        >
          Tagihan
        </NavItem>
        <NavItem
          Icon={Icons.UserSquare2}
          isActive={currentRoute === routeNames.profile}
          routeName={routeNames.profile}
        >
          Profil
        </NavItem>
      </div>
    </div>
  )
}

export default Sidebar
