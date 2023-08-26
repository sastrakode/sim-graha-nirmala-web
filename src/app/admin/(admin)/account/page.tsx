import OccupantTable from "@/components/admin/account/occupant-table"
import StaffTable from "@/components/admin/account/staff-table"
import { Button } from "@/components/ui/button"
import Icons from "@/components/ui/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getHouses, getOccupants, getStaffs } from "@/lib/api"

export default async function AdminAccountPage() {
  const [[occupants, occupantsErr], [houses, housesErr], [staffs, staffsErr]] =
    await Promise.all([getOccupants(), getHouses(), getStaffs()])

  if (occupantsErr || housesErr || staffsErr) {
    throw new Error("Something went wrong")
  }

  return (
    <div className="m-6">
      <Tabs defaultValue="occupant">
        <TabsList>
          <TabsTrigger value="occupant">Penghuni</TabsTrigger>
          <TabsTrigger value="staff">Staf</TabsTrigger>
        </TabsList>
        <TabsContent value="occupant">
          <div className="flex w-full justify-between items-center">
            <h4 className="text-primary">Tabel Penghuni</h4>
            <Button asChild>
              <a href="/admin/account/occupant/add">
                <Icons.Plus size={20} className="mr-1" />
                Tambah penghuni
              </a>
            </Button>
          </div>

          <OccupantTable occupants={occupants} houses={houses} />
        </TabsContent>
        <TabsContent value="staff">
          <div className="flex w-full justify-between items-center">
            <h4 className="text-primary">Tabel Staf</h4>
            <Button asChild>
              <a href="/admin/account/occupant/add">
                <Icons.Plus size={20} className="mr-1" />
                Tambah staf
              </a>
            </Button>
          </div>
          <StaffTable staffs={staffs} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
