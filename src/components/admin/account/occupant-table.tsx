import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { role } from "@/lib/constants"
import { House, Occupant } from "@/lib/model"
import Link from "next/link"

export default function OccupantTable({
  occupants,
  houses,
}: {
  occupants: Occupant[]
  houses: House[]
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>No. Rumah</TableHead>
          <TableHead>No. Telp</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Tipe</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {occupants.length > 0 &&
          occupants.map((occupant) => (
            <TableRow key={occupant.id}>
              <TableCell>{occupant.id}</TableCell>
              <TableCell>{occupant.name}</TableCell>
              <TableCell>
                {houses.find((house) => house.id == occupant.houseId)?.code}
              </TableCell>
              <TableCell>{occupant.phone ?? "-"}</TableCell>
              <TableCell>{occupant.email ?? "-"}</TableCell>
              <TableCell>{role[occupant.role]}</TableCell>
              <TableCell>
                <Link href={`/admin/account/occupant/edit/${occupant.id}`}>
                  <Button className="mr-1" variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
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
