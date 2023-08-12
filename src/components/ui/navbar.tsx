import { Button } from "./button"
import Link from "next/link"
import LogoutButton from "./logout-button"

const pageName: { [key: string]: string } = {
  "/dashboard": "Dashboard",
  "/dashboard/transaction": "Transaksi",
  "/dashboard/bill": "Tagihan",
  "/dashboard/profile": "Profil",
}

const Navbar = ({ currentRoute }: { currentRoute: string }) => {
  return (
    <nav className="flex shadow-md bg-white sticky top-0 w-full justify-between items-center p-6">
      <h4 className="text-primary">{pageName[currentRoute]}</h4>
      <LogoutButton />
    </nav>
  )
}

export default Navbar
