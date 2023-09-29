import { AnnouncementForm } from "@/components/admin/announcement/announcement-form"
import {
  getAnnouncement,
  getAnnouncementCategories,
  getStaffs,
} from "@/lib/api"
import { notFound } from "next/navigation"

export default async function EditAnnouncementPage({
  params,
}: {
  params: { id: string }
}) {
  const [[announcement], [announcementCategories], [staffs]] =
    await Promise.all([
      getAnnouncement(params.id),
      getAnnouncementCategories(),
      getStaffs(),
    ])

  if (!announcement) {
    notFound()
  }

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
