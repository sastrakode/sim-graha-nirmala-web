import AnnouncementTable from "@/components/admin/announcement/announcement-table"
import { getAnnouncements } from "@/lib/api"

export default async function AdminAnnouncementPage() {
  const [annoucements, annoucementsErr] = await getAnnouncements()

  return (
    <div className="m-6">
      <AnnouncementTable announcements={annoucements} />
    </div>
  )
}
