import { Button } from "./button"

const pageName: { [key: string]: string } = {
  "/dashboard": "Dashboard",
  "/transaction": "Transaksi",
  "/bill": "Tagihan",
  "/profile": "Profil",
}

const Navbar = ({ currentRoute }: { currentRoute: string }) => (
  <nav className="flex shadow-md bg-white sticky top-0 w-full justify-between items-center p-6">
    <h4 className="text-primary">{pageName[currentRoute]}</h4>
    <Button variant={"destructive"}>Keluar</Button>
  </nav>
)

export default Navbar
