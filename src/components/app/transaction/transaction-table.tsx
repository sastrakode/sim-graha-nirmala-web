"use client"

import { Transaction } from "@/lib/model"
import { useState } from "react"
import TransactionListItem from "./transaction-list-item"

export default function TransactionTable({
  transactions,
}: {
  transactions: Transaction[]
}) {
  const [activeTab, setActiveTab] = useState("all")

  const handleTabClick = (category: string) => {
    if (category === activeTab) return

    setActiveTab(category)
  }
  return (
    <>
      <div className="flex justify-evenly">
        <div
          className={`cursor-pointer text-xs md:text-base px-[2%] py-2 md:py-4 ${
            activeTab === "all" &&
            "text-secondary border-b-2 border-secondary font-bold"
          }`}
          onClick={() => handleTabClick("all")}
        >
          Semua
        </div>
        <div
          className={`cursor-pointer text-xs md:text-base px-[2%] py-2 md:py-4 ${
            activeTab === "CREDIT" &&
            "text-secondary border-b-2 border-secondary font-bold"
          }`}
          onClick={() => handleTabClick("CREDIT")}
        >
          Pemasukan
        </div>
        <div
          className={`cursor-pointer text-xs md:text-base px-[2%] py-2 md:py-4 ${
            activeTab === "DEBIT" &&
            "text-secondary border-b-2 border-secondary font-bold"
          }`}
          onClick={() => handleTabClick("DEBIT")}
        >
          Pengeluaran
        </div>
      </div>
      <div className="flex flex-col gap-5 px-4 sm:px-9 py-6">
        {transactions.length === 0 ? (
          <p className="text-primary text-base font-medium text-center">
            Tidak ada transaksi kas
          </p>
        ) : (
          transactions
            .filter((transaction: Transaction) => {
              if (activeTab === "all") return true

              return transaction.flow === activeTab
            })
            .map((transaction: Transaction) => {
              if (transaction.id !== null) {
                if (transaction.belong_type === "CASHFLOW") {
                  return (
                    <TransactionListItem
                      key={transaction.id ?? Math.random()}
                      belongType={transaction.belong_type ?? ""}
                      date={
                        transaction.created_at
                          ? new Date(transaction.created_at)
                          : new Date()
                      }
                      amount={transaction.amount ?? 0}
                      flow={transaction.flow ?? "CASHFLOW"}
                      cashflowTitle={transaction.cashflow?.title ?? ""}
                    />
                  )
                }
                return (
                  <TransactionListItem
                    key={transaction.id ?? Math.random()}
                    belongType={transaction.belong_type ?? ""}
                    date={
                      transaction.created_at
                        ? new Date(transaction.created_at)
                        : new Date()
                    }
                    amount={transaction.amount ?? 0}
                    flow={transaction.flow ?? "CASHFLOW"}
                  />
                )
              }
            })
        )}
      </div>
    </>
  )
}
