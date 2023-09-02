import TransactionSummaryCard from "@/components/app/transaction/transaction-summary-card"
import { dummyTransactionSummary, dummyTransactions } from "@/lib/dummyData"
import { Transaction } from "@/lib/model"
import TransactionTable from "@/components/app/transaction/transaction-table"
import { Button } from "@/components/ui/button"
import Icons from "@/components/ui/icons"

export default function AdminTransactionPage() {
  const transactionSummary = dummyTransactionSummary
  const transactions: Transaction[] = dummyTransactions

  return (
    <div className="m-6">
      <TransactionSummaryCard transactionSummary={transactionSummary} />
      <div className="">
        <Button asChild>
          <a href="/admin/transaction/add">
            <Icons.Plus size={20} className="mr-1" />
            Tambah transaksi
          </a>
        </Button>
      </div>
      <div className="bg-white mt-8 rounded-3xl">
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  )
}
