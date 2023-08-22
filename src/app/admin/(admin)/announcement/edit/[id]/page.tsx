import { AnnouncementForm } from "@/components/admin/announcement/announcement-form"
import {
  getAnnouncement,
  getAnnouncementCategories,
  getStaffs,
} from "@/lib/api"

export default async function EditAnnouncementPage({
  params,
}: {
  params: { id: string }
}) {
  const [
    [announcement, announcementErr],
    [announcementCategories, announcementCategoryErr],
    [staffs, staffsErr],
  ] = await Promise.all([
    getAnnouncement(params.id),
    getAnnouncementCategories(),
    getStaffs(),
  ])

  return (
    <div className="m-6">
      <AnnouncementForm
        announcement={announcement}
        announcementCategories={announcementCategories}
        authors={staffs}
      />
    </div>
  )
}
