import { Metadata } from "next"
import Link from "next/link"

import OverviewCard from "@/components/ui/overview-card"
import TransactionListItem from "@/components/ui/transaction-list-item"
import { dummyAnnouncements, dummyTransactions } from "@/lib/dummyData"
import { Announcement, Transaction } from "@/lib/model"
import { Button } from "@/components/ui/button"
import AnnouncementBox from "@/components/ui/announcement-box"

export const metadata: Metadata = {
  title: "Dashboard - SIMGN",
}

export default function DashboardPage() {
  const transactions: Transaction[] = dummyTransactions

  const announcements: Announcement[] = dummyAnnouncements

  return (
    <div className="flex flex-col gap-[1.125rem] lg:flex-row lg:gap-8">
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

        <section className="bg-white p-4 mt-[1.125rem] lg:mt-9 rounded-3xl">
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
            <Link href="/transaction">
              <Button variant="outline" size="sm">
                LIHAT SEMUA
              </Button>
            </Link>
          </div>
        </section>
      </div>
      <section className="basis-1/2">
        <h6>Pemberitahuan</h6>
        <div className="flex flex-col gap-6 mt-3">
          {announcements.length === 0 ? (
            <div className="flex items-end p-8 text-navy bg-white justify-center rounded-3xl mt-6">
              <p className="text-primary font-medium text-center">
                Tidak ada pemberitahuan
              </p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <AnnouncementBox
                key={announcement.id ?? Math.random()}
                category={announcement.title ?? ""}
                content={announcement.body ?? ""}
                date={
                  announcement.created_at
                    ? new Date(announcement.created_at)
                    : new Date()
                }
              />
            ))
          )}
        </div>
      </section>
    </div>
  )
}
