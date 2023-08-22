import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AnnouncementResponse } from "@/server/models/responses/announcement"

export default function AnnouncementTable({
  announcements,
}: {
  announcements: AnnouncementResponse[]
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Judul</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead>Konten</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {announcements.length > 0 &&
          announcements.map((announcement) => (
            <TableRow key={announcement.id}>
              <TableCell>{announcement.id}</TableCell>
              <TableCell>{announcement.title}</TableCell>
              <TableCell>{announcement.announcementCategory?.name}</TableCell>
              <TableCell>{announcement.content}</TableCell>
              <TableCell>{announcement.author?.name}</TableCell>
              <TableCell className="flex gap-1">
                <a href={`/admin/announcement/edit/${announcement.id}`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </a>
                <Button variant="destructive" size="sm">
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
