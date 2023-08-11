import { TransactionSummary } from "@/lib/model"
import { numberFormat } from "@/lib/utils"

export default function TransactionSummaryCard({
  transactionSummary,
}: {
  transactionSummary: TransactionSummary
}) {
  return (
    <div className="bg-white rounded-3xl w-fit p-4 mx-auto">
      <div className="text-center">
        <div className="txt-lead md:text-base md:font-bold">Total Kas</div>
        <div className="text-lg text-secondary font-bold md:text-xl md:font-bold">
          {numberFormat(transactionSummary.total ?? 0)}
        </div>
      </div>

      <div className="flex gap-5 mt-5">
        <div className="bg-success/10 py-2 px-4 text-center rounded-3xl">
          <div className="flex items-center justify-evenly">
            <div className="w-8 max-w-[8px] h-2 max-h-[8px] justify-self-end rounded-full bg-success" />
            <div className="text-xs">Pemasukan</div>
          </div>

          <div className="txt-lead text-success">
            {numberFormat(transactionSummary.credit ?? 0)}
          </div>
        </div>
        <div className="bg-destructive/10 py-2 px-4 text-center rounded-3xl">
          <div className="flex items-center justify-evenly">
            <div className="w-8 max-w-[8px] h-2 max-h-[8px] justify-self-end rounded-full bg-destructive" />
            <div className="text-xs">Pengeluaran</div>
          </div>

          <div className="txt-lead text-destructive">
            {numberFormat(transactionSummary.debit ?? 0)}
          </div>
        </div>
      </div>
    </div>
  )
}
