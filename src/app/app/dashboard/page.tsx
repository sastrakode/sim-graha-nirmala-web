import { Metadata } from "next"
import Link from "next/link"

import OverviewCard from "@/components/ui/overview-card"
import TransactionListItem from "@/components/ui/transaction-list-item"
import { dummyTransactions } from "@/lib/dummyData"
import { Transaction } from "@/lib/model"
import { Button } from "@/components/ui/button"
import AnnouncementList from "@/components/dashboard/announcement-list"

export const metadata: Metadata = {
  title: "Dashboard - SIMGN",
}

export default function DashboardPage() {
  const transactions: Transaction[] = dummyTransactions

  return (
    <div className="flex flex-col gap-[1.125rem] m-6 lg:flex-row lg:gap-8">
      <div className="basis-1/2">
        <section className="">
          <h6>Overview</h6>
          <div className="flex flex-col flex-wrap mt-4 gap-4 sm:flex-row">
            <OverviewCard
              title="Total Kas"
              total={32_080_000}
              icon="total_cash.png"
              className="bg-secondary"
            />
            <OverviewCard
              title="Pemasukan"
              total={60_080_000}
              icon="income.png"
              className="bg-success"
            />
            <OverviewCard
              title="Pengeluaran"
              total={27_920_000}
              icon="outcome.png"
              className="bg-destructive"
            />
          </div>
        </section>

        <section className="mt-[1.125rem] lg:mt-9">
          <AnnouncementList />
        </section>
      </div>
      <section className="bg-white basis-1/2 p-4 rounded-3xl h-fit">
        <h6>Transaksi Kas Terbaru</h6>
        <div className="h-[2px] w-full bg-gray-200 mt-3 mb-7" />
        <div className="flex flex-col gap-5">
          {transactions.length === 0 ? (
            <p className="text-navy text-base font-medium text-center">
              Tidak ada transaksi kas
            </p>
          ) : (
            transactions.map((transaction: Transaction) => {
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
        <div className="flex justify-center mt-8">
          <Link href="/dashboard/transaction">
            <Button variant="outline" size="sm">
              LIHAT SEMUA
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
