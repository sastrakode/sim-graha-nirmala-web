import { numberFormat } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BillingResponse } from "@/server/models/responses/billing"
import { payBill } from "@/lib/api"

export default function BillListItem({ bill }: { bill: BillingResponse }) {
  const handlePay = async () => {
    const [payment, err] = await payBill(bill.id)

    window.open(
      `${process.env.NEXT_PUBLIC_MIDTRANS_PAYMENT_URL}/${payment.token}`,
    )
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
