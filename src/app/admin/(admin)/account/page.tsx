import OccupantTable from "@/components/admin/account/occupant-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getHouses, getOccupants } from "@/lib/api"

export default async function AdminAccountPage() {
  const [[occupants, occupantsErr], [houses, housesErr]] = await Promise.all([
    getOccupants(),
    getHouses(),
  ])

  if (occupantsErr || housesErr) {
    throw new Error("Something went wrong")
  }

  return (
    <div className="m-6">
      <Tabs defaultValue="occupant" className="">
        <TabsList>
          <TabsTrigger value="occupant">Penghuni</TabsTrigger>
          <TabsTrigger value="staff">Staf</TabsTrigger>
        </TabsList>
        <TabsContent value="occupant">
          <OccupantTable occupants={occupants} houses={houses} />
        </TabsContent>
        <TabsContent value="staff">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}
