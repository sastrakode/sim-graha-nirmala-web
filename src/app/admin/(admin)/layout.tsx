import Navbar from "@/components/ui/navbar"
import AdminSidebar from "@/components/ui/admin-sidebar"

export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AdminSidebar />
      <div className="flex flex-col lg:ml-[15.5rem]">
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  )
}
