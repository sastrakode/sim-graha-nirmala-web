import { HouseForm } from "@/components/admin/house/house-form"
import { getHouse } from "@/lib/api"

export default async function EditHousePage({
  params,
}: {
  params: { id: string }
}) {
  const [house, houseErr] = await getHouse(params.id)

  if (houseErr) {
    throw new Error("Something went wrong")
  }

  return (
    <div className="m-6">
      <HouseForm house={house} />
    </div>
  )
}
