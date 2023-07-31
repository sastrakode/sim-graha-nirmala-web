"use client"

import { usePathname } from "next/navigation"

import Navbar from "@/components/ui/navbar"
import Sidebar from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentRoute = usePathname()

  return (
    <div>
      <Sidebar currentRoute={currentRoute} />
      <div className="flex flex-col lg:ml-[15.5rem]">
        <Navbar currentRoute={currentRoute} />
        <main className="m-6">{children}</main>
      </div>
    </div>
  )
}
