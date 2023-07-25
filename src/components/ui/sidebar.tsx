import Icons from "../icons"
import NavItem from "./nav-item"

import { ROUTE_NAMES } from "@/lib/constants"

const Sidebar = ({
  currentRoute
}: {
  currentRoute: string
}) => {
  return (
    <div className="bg-primary w-[15.5rem] text-center h-screen py-6 px-[1.15rem]">
      <h3 className="text-white">SIMGN</h3>
      <div className="h-[3px] w-full bg-slate-400 my-6" />

      <div className="flex flex-col h-full space-y-3 text-white">
        <NavItem Icon={Icons.LayoutDashboard} isActive={currentRoute === ROUTE_NAMES.dashboard} routeName={ROUTE_NAMES.dashboard}>Dashboard</NavItem>
        <NavItem Icon={Icons.ArrowLeftRight} isActive={currentRoute === ROUTE_NAMES.transaction} routeName={ROUTE_NAMES.transaction}>Transaksi</NavItem>
        <NavItem Icon={Icons.Receipt} isActive={currentRoute === ROUTE_NAMES.bill} routeName={ROUTE_NAMES.bill}>Tagihan</NavItem>
        <NavItem Icon={Icons.UserSquare2} isActive={currentRoute === ROUTE_NAMES.profile} routeName={ROUTE_NAMES.profile}>Profil</NavItem>
      </div>
    </div>
  )
}

export default Sidebar