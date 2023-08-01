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
    <div className="flex items-center flex-wrap">
      <div className="flex mr-auto items-center">
        <div className="rounded-full p-4 aspect-square flex items-center shadow-md">
          <Image
            src="/images/money.svg"
            alt="Transaksi"
            width={27}
            height={16}
          />
        </div>
        <div className="ml-4">
          <p className="txt-b2 md:txt-lead text-primary">{title[belongType]}</p>
          <p className="text-xs">{dateFormat(date, true)}</p>
        </div>
      </div>
      <div
        className={
          `txt-b2 flex justify-end min-w-[135px] md:min-w-[165px]` +
          (flow === "CREDIT" ? " text-success" : " text-destructive")
        }
      >
        <h6>{(flow === "DEBIT" ? "- " : "+ ") + `${numberFormat(amount)}`}</h6>
      </div>
    </div>
  )
}

export default TransactionListItem
