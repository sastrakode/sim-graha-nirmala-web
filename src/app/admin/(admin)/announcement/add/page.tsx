import { AnnouncementForm } from "@/components/admin/announcement/announcement-form"
import { getAnnouncementCategories, getStaffs } from "@/lib/api"

export default async function AddAnnouncementPage() {
  const [
    [announcementCategories, announcementCategoryErr],
    [staffs, staffsErr],
  ] = await Promise.all([getAnnouncementCategories(), getStaffs()])

  return (
    <div className="m-6">
      <AnnouncementForm
        announcementCategories={announcementCategories}
        authors={staffs}
      />
    </div>
  )
}
