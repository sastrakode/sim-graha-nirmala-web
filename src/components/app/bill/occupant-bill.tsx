import { BillListItem, BillTable } from "@/components/ui/bill"
import { getBills } from "@/lib/api"

export default async function OccupantBill({ houseId }: { houseId: string }) {
  let [bills, err] = await getBills(houseId)

  if (err) {
    throw new Error("Something went wrong")
  }

  return (
    <BillTable>
      {bills.length ? (
        bills.map((bill) => <BillListItem key={bill.id} bill={bill} />)
      ) : (
        <p>Tidak ada tagihan</p>
      )}
    </BillTable>
  )
}
