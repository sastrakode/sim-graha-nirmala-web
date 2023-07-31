import { useState } from "react"

import TransactionListItem from "./ui/transaction-list-item"
import { Transaction } from "@/lib/model"

export default function TransactionTable({
  transactionList,
}: {
  transactionList: Transaction[]
}) {
  const [category, setCategory] = useState("all")

  const handleCategory = (value: string) => {
    if (value === category) {
      return
    }

    setCategory(value)
  }

  return (
    <div className="w-full mt-9 pt-10 bg-white rounded-3xl flex flex-col flex-1">
      <div className="flex justify-around">
        <div
          className="min-w-[60px] flex flex-col items-center tablet:gap-6 tablet:min-w-[110px] cursor-pointer"
          onClick={() => handleCategory("all")}
        >
          <p
            className={`txt-b2 tablet:text-h6 ${
              category === "all" ? "text-secondary" : "text-primary"
            }`}
          >
            Semua
          </p>
          <div
            className={`w-full border-secondary border-2 rounded-3xl ${
              category !== "all" && "hidden"
            }`}
          />
        </div>

        <div
          className="min-w-[60px] flex flex-col items-center tablet:gap-6 tablet:min-w-[110px] cursor-pointer"
          onClick={() => handleCategory("CREDIT")}
        >
          <p
            className={`txt-b2 tablet:text-h6 ${
              category === "CREDIT" ? "text-secondary" : "text-primary"
            }`}
          >
            Pemasukan
          </p>
          <div
            className={`w-full border-secondary border-2 rounded-3xl ${
              category !== "CREDIT" && "hidden"
            }`}
          />
        </div>

        <div
          className="min-w-[60px] flex flex-col items-center tablet:gap-6 tablet:min-w-[110px] cursor-pointer"
          onClick={() => handleCategory("DEBIT")}
        >
          <p
            className={`txt-b2 tablet:text-h6 ${
              category === "DEBIT" ? "text-secondary" : "text-primary"
            }`}
          >
            Pengeluaran
          </p>
          <div
            className={`w-full border-secondary border-2 rounded-3xl ${
              category !== "DEBIT" && "hidden"
            }`}
          />
        </div>
      </div>

      <div className="mt-11 px-10 pb-10 space-y-5 flex-1 overflow-y-scroll max-h-[calc((var(--vh,1vh)*100)-47.25rem)] tablet:max-h-[calc(100vh-50.25rem)] laptop:max-h-[calc(100vh-42.65rem)]">
        {transactionList.length === 0 ? (
          <p className="text-primary text-base font-medium text-center">
            Tidak ada transaksi
          </p>
        ) : (
          transactionList
            .filter((item) => {
              if (category === "all") return true

              return item.flow === category
            })
            .map((transaction) => {
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
            })
        )}
      </div>
    </div>
  )
}
