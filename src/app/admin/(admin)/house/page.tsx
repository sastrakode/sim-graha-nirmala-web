import HouseTable from "@/components/admin/house/house-table"
import { getHouses } from "@/lib/api"

export default async function AdminHousePage() {
  const [houses, housesErr] = await getHouses()

  return (
    <div className="m-6">
      <HouseTable houses={houses} />
    </div>
  )
}
