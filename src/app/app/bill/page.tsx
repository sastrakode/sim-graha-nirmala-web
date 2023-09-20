import BillHistoryTable from "@/components/app/bill/bill-history-table"
import BillTable from "@/components/app/bill/bill-table"
import { Metadata } from "next"
import { cookies } from "next/headers"

export const metadata: Metadata = {
  title: "Tagihan - SIMGN",
}

export default function Bill() {
  const houseId = cookies().get("houseId")?.value || "-1"

  return (
    <div className="flex flex-col m-6 gap-8 lg:flex-row">
      <div className="grow">
        <BillTable houseId={houseId} paymentMethod="paymentGateway" />
      </div>
      <div className="grow">
        <BillHistoryTable houseId={houseId} />
      </div>
    </div>
  )
}
