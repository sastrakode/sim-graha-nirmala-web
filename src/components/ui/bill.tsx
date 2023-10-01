"use client"

import { ReactNode } from "react"
import { toast } from "sonner"

import { catchError, numberFormat } from "@/lib/utils"
import { Button } from "./button"
import { BillingResponse } from "@/server/models/responses/billing"
import { useRouter } from "next/navigation"
import { payBill, payBillCash } from "@/lib/api"

export const BillTable = ({ children }: { children: ReactNode }) => (
  <div className="bg-white p-4 mt-[1.125rem] lg:mt-9 rounded-3xl">
    <p className="font-bold text-sm sm:text-base">Tagihan</p>
    <div className="h-[2px] bg-gray-200 mt-3 mb-5" />
    <div className="flex flex-col gap-4 px-5 py-2 rounded-md hover:bg-gray-100">
      {children}
    </div>
  </div>
)

export function BillListItem({
  bill,
  occupantId,
}: {
  bill: BillingResponse
  occupantId?: number
}) {
  const router = useRouter()

  const handlePay = async () => {
    if (occupantId) {
      const [_, _err] = await payBillCash(bill.id, {
        occupant_id: occupantId,
      })

      toast.success("Pembayaran berhasil")
    } else {
      const [payment, _err] = await payBill(bill.id)

      if (payment.redirectUrl) {
        window.open(payment.redirectUrl, "_blank")
      } else {
        catchError(
          new Error("Tautan pembayaran gagal dibuka, silahkan coba bayar lagi"),
        )
      }
    }

    router.refresh()
  }

  return (
    <div className="flex justify-between items-center gap-x-4">
      <div className="flex flex-col gap-x-4 flex-wrap flex-1">
        <p className="font-bold text-sm">{`${new Date(
          bill.period,
        ).toLocaleString("id-ID", {
          month: "long",
        })} ${new Date(bill.period).getFullYear()}`}</p>
        <p className="text-sm sm:text-base">{numberFormat(bill.amount)}</p>
      </div>
      <Button
        variant="secondary"
        className="hidden sm:block"
        onClick={handlePay}
      >
        Bayar
      </Button>
      <Button
        variant="secondary"
        size="sm"
        className="sm:hidden"
        onClick={handlePay}
      >
        Bayar
      </Button>
    </div>
  )
}
