import Navbar from "@/components/ui/navbar"
import Sidebar from "@/components/ui/sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col lg:ml-[15.5rem]">
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  )
}
