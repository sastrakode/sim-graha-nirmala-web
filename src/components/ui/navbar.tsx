const pageName: { [key: string]: string } = {
  "/app/dashboard": "Dashboard",
  "/app/transaction": "Transaksi",
  "/app/bill": "Tagihan",
  "/app/profile": "Profil",

  "/admin/account": "Kelola Akun",
  "/admin/account/staff/add": "Tambah Staf",
  "/admin/account/staff/edit": "Edit Staf",
  "/admin/account/occupant/add": "Tambah Penghuni",
  "/admin/account/occupant/edit": "Tambah Staf",

  "/admin/house": "Kelola Rumah",
  "/admin/house/add": "Tambah Rumah",
  "/admin/house/edit": "Edit Rumah",

  "/admin/announcement": "Kelola Pengumuman",
  "/admin/announcement/add": "Tambah Pengumuman",
  "/admin/announcement/edit": "Edit Pengumuman",
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

const Navbar = ({
  currentRoute,
  params,
}: {
  currentRoute: string
  params: { [key: string]: string | string[] }
}) => {
  return (
    <nav className="flex shadow-md bg-white sticky top-0 justify-between items-center p-6 z-50">
      <h4 className="text-primary">
        {pageName[getRouteWithoutParams(currentRoute, params)]}
      </h4>
    </nav>
  )
}

export default Navbar
