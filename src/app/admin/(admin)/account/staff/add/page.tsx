import { StaffForm } from "@/components/admin/account/staff-form"
import { getStaff } from "@/lib/api"

export default async function AddStaffPage() {
  return (
    <div className="my-6 ml-6 mr-[50%]">
      <StaffForm />
    </div>
  )
}
