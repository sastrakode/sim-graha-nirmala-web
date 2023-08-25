import { EditStaffForm } from "@/components/admin/account/edit-staff-form"
import { getStaff } from "@/lib/api"

export default async function EditStaffPage({
  params,
}: {
  params: { id: string }
}) {
  const [staff, staffErr] = await getStaff(params.id)

  if (staffErr) {
    throw new Error("Something went wrong")
  }

  return (
    <div className="my-6 ml-6 mr-[50%]">
      <EditStaffForm staff={staff} />
    </div>
  )
}
