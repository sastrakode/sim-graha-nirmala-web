import { Button } from "@/components/ui/button"
import FamilyTable from "@/components/ui/family-table"
import Icons from "@/components/ui/icons"
import { getFamily } from "@/lib/api"
import { notFound } from "next/navigation"

export default async function FamilyPage({
  params,
}: {
  params: { occupantId: string }
}) {
  const [family, errs] = await getFamily(params.occupantId)

  console.log("im here")

  if (!family) {
    notFound()
  }

  return (
    <div className="m-6">
      <Button asChild>
        <a href="/app/profile/family/add">
          <Icons.Plus size={20} className="mr-1" />
          Tambah Anggota Keluarga
        </a>
      </Button>
      <FamilyTable family={family} />
    </div>
  )
}
