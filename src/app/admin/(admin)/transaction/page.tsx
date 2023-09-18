import TransactionSummaryCard from "@/components/app/transaction/transaction-summary-card"
import TransactionTable from "@/components/app/transaction/transaction-table"
import { Button } from "@/components/ui/button"
import Icons from "@/components/ui/icons"
import { getTransaction } from "@/lib/api"

export default async function AdminTransactionPage() {
  const [transaction, err] = await getTransaction()

  if (err) {
    throw new Error("Something went wrong")
  }

  return (
    <div className="m-6">
      <TransactionSummaryCard
        total={transaction.total}
        total_income={transaction.total_income}
        total_outcome={transaction.total_outcome}
      />
      <div className="">
        <Button asChild>
          <a href="/admin/transaction/add">
            <Icons.Plus size={20} className="mr-1" />
            Tambah transaksi
          </a>
        </Button>
      </div>
      <div className="bg-white mt-8 rounded-3xl">
        <TransactionTable transactions={transaction.transactions} />
      </div>
    </div>
  )
}
