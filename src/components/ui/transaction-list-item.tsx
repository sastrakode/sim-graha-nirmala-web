import Image from "next/image"

import { dateFormat, numberFormat } from "@/lib/utils"

const TransactionListItem = ({
  date,
  belongType,
  flow,
  amount,
  cashflowTitle,
}: {
  date: Date
  belongType: string
  flow: string
  amount: number
  cashflowTitle?: string
}) => {
  const title: { [key: string]: string } = {
    BILLING: "Pembayaran Iuran",
    CASHFLOW: cashflowTitle ?? "Transaksi",
  }

  return (
    <div className="flex sm:items-center gap-4">
      <div className="rounded-full h-[1.875rem] p-1 sm:p-2 flex items-center shadow-simgn sm:h-[2.6875rem]">
        <div className="relative w-[1.375rem] h-[0.6875rem] sm:w-[1.6875rem] sm:h-4">
          <Image src="/images/money.svg" alt="Transaksi" fill={true} />
        </div>
      </div>
      <div className="flex justify-between grow flex-wrap">
        <div className="">
          <p className="txt-tiny sm:txt-lead text-primary">
            {title[belongType]}
          </p>
          <p className="text-[0.5rem] sm:text-xs text-gray-400">
            {dateFormat(date, true)}
          </p>
        </div>
        <p
          className={`justify-self-end text-[0.625rem] sm:text-base font-bold ${
            flow === "CREDIT" ? " text-success" : " text-destructive"
          }`}
        >
          {(flow === "DEBIT" ? "- " : "+ ") + `${numberFormat(amount)}`}
        </p>
      </div>
    </div>
  )
}

export default TransactionListItem
