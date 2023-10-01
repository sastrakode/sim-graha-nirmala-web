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
import { roleValue } from "@/lib/constants"
import { HouseResponse } from "@/server/models/responses/house"
import { GetAllOccupantsResponse } from "@/server/models/responses/occupant"

export default function OccupantTable({
  occupants,
  houses,
}: {
  occupants: GetAllOccupantsResponse[]
  houses: HouseResponse[]
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
          <TableHead>Kartu Keluarga</TableHead>
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
                {houses.find((house) => house.id == occupant.house_id)?.code}
              </TableCell>
              <TableCell>{occupant.phone ?? "-"}</TableCell>
              <TableCell>{occupant.email ?? "-"}</TableCell>
              <TableCell>{roleValue[occupant.role]}</TableCell>
              <TableCell>
                {occupant.is_family_card_uploaded ? (
                  <Button className="mr-1" variant="link" size="sm" asChild>
                    <a
                      href={`/occupant/${occupant.id}/family-card`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat Dokumen
                    </a>
                  </Button>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                <Button className="mr-1" variant="outline" size="sm" asChild>
                  <a href={`/admin/account/occupant/${occupant.id}/family`}>
                    Lihat Keluarga
                  </a>
                </Button>
                <a href={`/admin/account/occupant/edit/${occupant.id}`}>
                  <Button className="mr-1" variant="outline" size="sm">
                    Edit
                  </Button>
                </a>
                <DeleteAlertDialog
                  message={`Apakah anda yakin ingin menghapus ${occupant.name}?`}
                  domain="occupant"
                  id={occupant.id}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
