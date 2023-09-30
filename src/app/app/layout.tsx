import MobileNav from "@/components/ui/mobile-nav"
import Navbar from "@/components/ui/navbar"
import Sidebar from "@/components/ui/sidebar"

export const dynamic = "force-dynamic"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[92px] lg:mb-0">
      <Sidebar />
      <div className="flex flex-col lg:ml-[15.5rem]">
        <Navbar />
        <main>{children}</main>
        <MobileNav />
      </div>
    </div>
  )
}
