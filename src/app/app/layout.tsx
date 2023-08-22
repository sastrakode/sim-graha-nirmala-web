"use client"

import { useParams, usePathname } from "next/navigation"

import Navbar from "@/components/ui/navbar"
import Sidebar from "@/components/ui/sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const currentRoute = usePathname()
  const params = useParams()

  return (
    <>
      <Sidebar currentRoute={currentRoute} />
      <div className="flex flex-col lg:ml-[15.5rem]">
        <Navbar currentRoute={currentRoute} params={params} />
        <main>{children}</main>
      </div>
    </>
  )
}
