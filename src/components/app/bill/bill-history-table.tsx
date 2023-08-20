import { dummyBillHistory } from "@/lib/dummyData"
import BillHistoryItem from "./bill-history-item"

export default function BillHistoryTable() {
  const billHistory = dummyBillHistory

  return (
    <div className="bg-white p-4 mt-[1.125rem] lg:mt-9 rounded-3xl">
      <p className="text-sm font-bold sm:text-base">Riwayat Tagihan</p>
      <div className="h-[2px] bg-gray-200 mt-3 mb-5" />
      <div className="flex flex-col gap-6 px-5">
        {billHistory.length === 0 ? (
          <p className="text-navy text-base font-medium text-center">
            Tidak ada transaksi kas
          </p>
        ) : (
          billHistory.map((item) => (
            <BillHistoryItem
              key={item.id}
              status={item.status ?? ""}
              date={item.created_at ? new Date(item.created_at) : new Date()}
              amount={item.amount ?? 0}
            />
          ))
        )}
      </div>
    </div>
  )
}
