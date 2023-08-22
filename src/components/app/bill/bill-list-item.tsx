import { numberFormat } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function BillListItem() {
  return (
    <div className="flex justify-between p4 items-center">
      <p className="font-bold text-sm">Januari</p>
      <p className="font-bold text-sm sm:text-base">{numberFormat(150_000)}</p>
      <Button variant="secondary" className="hidden sm:block">
        Bayar
      </Button>
      <Button variant="secondary" size="sm" className="sm:hidden">
        Bayar
      </Button>
    </div>
  )
}
