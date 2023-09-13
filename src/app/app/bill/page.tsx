import BillHistoryTable from "@/components/app/bill/bill-history-table"
import BillTable from "@/components/app/bill/bill-table"
import { getBills } from "@/lib/api"
import { Metadata } from "next"
import { cookies } from "next/headers"

export const metadata: Metadata = {
  title: "Tagihan - SIMGN",
}

export default async function Bill() {
  const houseId = cookies().get("houseId")?.value || "-1"
  const [bills, err] = await getBills(houseId)

  if (err) {
    throw new Error("Something went wrong")
  }

  return (
    <div className="flex flex-col m-6 gap-8 lg:flex-row">
      <div className="grow">
        <BillTable bills={bills} />
      </div>
      <div className="grow">
        <BillHistoryTable />
      </div>
    </div>
  )
}
