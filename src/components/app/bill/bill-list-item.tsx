"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { catchError, numberFormat } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BillingResponse } from "@/server/models/responses/billing"
import { payBill, payBillCash } from "@/lib/api"

export default function BillListItem({
  bill,
  occupantId,
}: {
  bill: BillingResponse
  occupantId?: number
}) {
  const router = useRouter()

  const handlePay = async () => {
    if (occupantId) {
      const [_, err] = await payBillCash(bill.id, {
        occupant_id: occupantId,
      })

      if (err) {
        catchError(new Error("Pembayaran gagal"))
      } else {
        toast.success("Pembayaran berhasil")
      }
    } else {
      const [payment, err] = await payBill(bill.id)
      if (payment.redirect_url) {
        window.open(payment.redirect_url)
      }
    }

    router.refresh()
  }

  return (
    <div className="flex justify-between p4 items-center">
      <p className="font-bold text-sm">{`${new Date(bill.period).toLocaleString(
        "id-ID",
        {
          month: "long",
        },
      )} ${new Date(bill.period).getFullYear()}`}</p>
      <p className="font-bold text-sm sm:text-base">
        {numberFormat(bill.amount)}
      </p>
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
