"use client"

import { usePathname } from 'next/navigation'

import Navbar from "@/components/ui/navbar"
import Sidebar from "@/components/ui/sidebar"

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const currentRoute = usePathname()
  
  return (
    <section className="flex">
      <Sidebar currentRoute={currentRoute} />
      <div className="flex flex-col grow">
        <Navbar currentRoute={currentRoute} />
        <div className="p-6">
          {children}
        </div>
      </div>
      
    </section>
  )
}