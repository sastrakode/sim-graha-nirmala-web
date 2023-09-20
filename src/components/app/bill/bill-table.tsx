import { BillingResponse } from "@/server/models/responses/billing"
import BillListItem from "./bill-list-item"
import { PaymentMethod } from "@/lib/constants"
import { getBills } from "@/lib/api"

export default async function BillTable({
  houseId,
  paymentMethod,
}: {
  houseId: string
  paymentMethod: PaymentMethod
}) {
  const [bills, err] = await getBills(houseId)

  if (err) {
    throw new Error("Something went wrong")
  }

  return (
    <div className="bg-white p-4 mt-[1.125rem] lg:mt-9 rounded-3xl">
      <p className="font-bold text-sm sm:text-base">Tagihan</p>
      <div className="h-[2px] bg-gray-200 mt-3 mb-5" />
      <div className="flex flex-col gap-6 px-5">
        {bills.length ? (
          bills.map((bill) => (
            <BillListItem
              key={bill.id}
              bill={bill}
              paymentMethod={paymentMethod}
            />
          ))
        ) : (
          <p>Tidak ada tagihan</p>
        )}
      </div>
    </div>
  )
}
