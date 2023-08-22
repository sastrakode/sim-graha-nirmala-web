import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { House } from "@/lib/model"
import Link from "next/link"

export default function HouseTable({ houses }: { houses: House[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Kode</TableHead>
          <TableHead>Alamat</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {houses.length > 0 &&
          houses.map((house) => (
            <TableRow key={house.id}>
              <TableCell>{house.id}</TableCell>
              <TableCell>{house.code}</TableCell>
              <TableCell>{house.address}</TableCell>
              <TableCell>
                <Link href={`/admin/house/edit/${house.id}`}>
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
