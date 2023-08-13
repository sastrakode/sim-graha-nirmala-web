const pageName: { [key: string]: string } = {
  "/dashboard": "Dashboard",
  "/dashboard/transaction": "Transaksi",
  "/dashboard/bill": "Tagihan",
  "/dashboard/profile": "Profil",
}

const Navbar = ({ currentRoute }: { currentRoute: string }) => {
  return (
    <nav className="flex shadow-md bg-white sticky top-0 justify-between items-center p-6 z-50">
      <h4 className="text-primary">{pageName[currentRoute]}</h4>
    </nav>
  )
}

export default Navbar
