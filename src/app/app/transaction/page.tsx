import { Metadata } from "next"

import TransactionSummaryCard from "@/components/app/transaction/transaction-summary-card"

import TransactionTable from "@/components/app/transaction/transaction-table"
import { getTransaction } from "@/lib/api"

export const metadata: Metadata = {
  title: "Transaksi - SIMGN",
}

export default async function TransactionPage() {
  const [transaction, err] = await getTransaction()

  return (
    <div className="m-6">
      <TransactionSummaryCard
        total={transaction.total}
        total_income={transaction.total_income}
        total_outcome={transaction.total_outcome}
      />
      <div className="bg-white mt-8 rounded-3xl">
        <TransactionTable transactions={transaction.transactions} />
      </div>
    </div>
  )
}
