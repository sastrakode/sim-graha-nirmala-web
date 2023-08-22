import BillHistoryTable from "@/components/app/bill/bill-history-table"
import BillTable from "@/components/app/bill/bill-table"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tagihan - SIMGN",
}

export default function Bill() {
  return (
    <div className="flex flex-col m-6 gap-8 lg:flex-row">
      <div className="grow">
        <BillTable />
      </div>
      <div className="grow">
        <BillHistoryTable />
      </div>
    </div>
  )
}
