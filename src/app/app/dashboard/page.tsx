import { Metadata } from "next"

import OverviewCard from "@/components/app/dashboard/overview-card"
import AnnouncementList from "@/components/app/dashboard/announcement-list"
import TransactionTableSummary from "@/components/app/dashboard/transaction-table-summary"
import { getTransaction } from "@/lib/api"

export const metadata: Metadata = {
  title: "Dashboard - SIMGN",
}

export default async function DashboardPage() {
  const [transaction, err] = await getTransaction()

  if (err) {
    throw new Error("Something went wrong")
  }

  return (
    <div className="flex flex-col gap-[1.125rem] m-6 lg:flex-row lg:gap-8">
      <div className="basis-1/2">
        <section className="">
          <h6>Overview</h6>
          <div className="flex flex-col flex-wrap mt-4 gap-4 sm:flex-row">
            <OverviewCard
              title="Total Kas"
              total={transaction.total}
              icon="total_cash.png"
              className="bg-secondary"
            />
            <OverviewCard
              title="Pemasukan"
              total={transaction.total_income}
              icon="income.png"
              className="bg-success"
            />
            <OverviewCard
              title="Pengeluaran"
              total={transaction.total_outcome}
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
        <TransactionTableSummary transactions={transaction.transactions} />
      </section>
    </div>
  )
}
