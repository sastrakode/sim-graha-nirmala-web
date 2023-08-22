"use client"

import { useParams, usePathname } from "next/navigation"

import Navbar from "@/components/ui/navbar"
import AdminSidebar from "@/components/ui/admin-sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const currentRoute = usePathname()
  const params = useParams()

  return (
    <>
      <AdminSidebar currentRoute={currentRoute} />
      <div className="flex flex-col lg:ml-[15.5rem]">
        <Navbar currentRoute={currentRoute} params={params} />
        <main>{children}</main>
      </div>
    </>
  )
}
