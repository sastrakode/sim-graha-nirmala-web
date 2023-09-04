import { Button } from "@/components/ui/button"
import DeleteAlertDialog from "@/components/ui/delete-alert-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { role } from "@/lib/constants"
import { StaffResponse } from "@/server/models/responses/staff"

export default function StaffTable({ staffs }: { staffs: StaffResponse[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>No. Telp</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Tipe</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {staffs.length > 0 &&
          staffs.map((staff) => (
            <TableRow key={staff.id}>
              <TableCell>{staff.id}</TableCell>
              <TableCell>{staff.name}</TableCell>
              <TableCell>{staff.phone}</TableCell>
              <TableCell>{staff.email ?? "-"}</TableCell>
              <TableCell>{role[staff.role]}</TableCell>
              <TableCell>
                <a href={`/admin/account/staff/edit/${staff.id}`}>
                  <Button className="mr-1" variant="outline" size="sm">
                    Edit
                  </Button>
                </a>
                <DeleteAlertDialog
                  message={`Apakah anda yakin ingin menghapus ${staff.name}?`}
                  domain="staff"
                  id={staff.id}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
