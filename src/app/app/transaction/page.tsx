import { Metadata } from "next"

import TransactionSummaryCard from "@/components/app/transaction/transaction-summary-card"

import { dummyTransactionSummary, dummyTransactions } from "@/lib/dummyData"
import { Transaction } from "@/lib/model"
import TransactionTable from "@/components/app/transaction/transaction-table"

export const metadata: Metadata = {
  title: "Transaksi - SIMGN",
}

export default function TransactionPage() {
  const transactionSummary = dummyTransactionSummary
  const transactions: Transaction[] = dummyTransactions

  return (
    <div className="m-6">
      <TransactionSummaryCard transactionSummary={transactionSummary} />
      <div className="bg-white mt-8 rounded-3xl">
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  )
}
