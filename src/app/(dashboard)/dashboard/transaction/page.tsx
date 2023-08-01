import { Metadata } from "next"

import TransactionSummaryCard from "@/components/ui/transaction-summary-card"

import { dummyTransactionSummary } from "@/lib/dummyData"
import { numberFormat } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Transaksi - SIMGN",
}

export default function TransactionPage() {
  const transactionSummary = dummyTransactionSummary

  return (
    <div className="">
      <TransactionSummaryCard transactionSummary={transactionSummary} />
    </div>
  )
}
