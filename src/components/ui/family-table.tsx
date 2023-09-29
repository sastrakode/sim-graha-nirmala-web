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
import { dateFormat } from "@/lib/utils"
import { FamilyResponse } from "@/server/models/responses/family"

export default function FamilyTable({ family }: { family: FamilyResponse[] }) {
  // export default function FamilyTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Nama Lengkap</TableHead>
          <TableHead>NIK</TableHead>
          <TableHead>Jenis Kelamin</TableHead>
          <TableHead>Tempat Lahir</TableHead>
          <TableHead>Tanggal Lahir</TableHead>
          <TableHead>Agama</TableHead>
          <TableHead>Pendidikan</TableHead>
          <TableHead>Jenis Pekerjaan</TableHead>
          <TableHead>Status Perkawinan</TableHead>
          {/* <TableHead>Tanggal Perkawinan</TableHead> */}
          <TableHead>Status Hubungan Dalam Keluarga</TableHead>
          <TableHead>Ayah</TableHead>
          <TableHead>Ibu</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {family.length > 0 ? (
          family.map((familyMember, idx) => (
            <TableRow key={familyMember.id}>
              <TableCell>{idx}</TableCell>
              <TableCell>{familyMember.name}</TableCell>
              <TableCell>{familyMember.identity_number}</TableCell>
              <TableCell>{familyMember.gender}</TableCell>
              <TableCell>{familyMember.birthplace}</TableCell>
              <TableCell>{dateFormat(familyMember.birthday)}</TableCell>
              <TableCell>{familyMember.religion}</TableCell>
              <TableCell>{familyMember.education}</TableCell>
              <TableCell>{familyMember.job_type}</TableCell>
              <TableCell>{familyMember.marital_status}</TableCell>
              <TableCell>{familyMember.relationship_status}</TableCell>
              <TableCell>{familyMember.father_name}</TableCell>
              <TableCell>{familyMember.mother_name}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={13} className="h-24 text-center">
              Tidak ada data.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
