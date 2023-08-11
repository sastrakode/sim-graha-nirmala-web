import api from "@/lib/api"
import { Button } from "./button"
import Link from "next/link"

const pageName: { [key: string]: string } = {
  "/dashboard": "Dashboard",
  "/dashboard/transaction": "Transaksi",
  "/dashboard/bill": "Tagihan",
  "/dashboard/profile": "Profil",
}

const Navbar = ({ currentRoute }: { currentRoute: string }) => {
  const logout = () => {
    delete api.defaults.headers.Authorization
  }

  return (
    <nav className="flex shadow-md bg-white sticky top-0 w-full justify-between items-center p-6">
      <h4 className="text-primary">{pageName[currentRoute]}</h4>
      <Link href="/logout">
        <Button variant={"destructive"} onClick={logout}>
          Keluar
        </Button>
      </Link>
    </nav>
  )
}

export default Navbar
