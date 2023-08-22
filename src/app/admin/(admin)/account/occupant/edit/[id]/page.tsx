import { OccupantForm } from "@/components/admin/account/occupant-form"
import { getHouses, getOccupant } from "@/lib/api"

export default async function EditOcuppantPage({
  params,
}: {
  params: { id: string }
}) {
  const [[occupant, occupantErr], [houses, housesErr]] = await Promise.all([
    getOccupant(params.id),
    getHouses(),
  ])

  if (occupantErr || housesErr) {
    throw new Error("Something went wrong")
  }

  return (
    <div className="my-6 ml-6 mr-[50%]">
      <OccupantForm occupant={occupant} houses={houses} />
    </div>
  )
}
