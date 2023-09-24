import { AdminBillTable } from "@/components/admin/bill/admin-bill-table"
import { getHouses } from "@/lib/api"

export default async function AdminBillPage() {
  const [houses, err] = await getHouses()

  return (
    <div className="m-6">
      <AdminBillTable
        houses={houses.filter((house) => house.owner || house.renter)}
      />
    </div>
  )
}
