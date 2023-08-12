import BillListItem from "./bill-list-item"

export default function BillTable() {
  return (
    <div className="bg-white p-4 mt-[1.125rem] lg:mt-9 rounded-3xl">
      <p className="font-bold text-sm sm:text-base">Tagihan</p>
      <div className="h-[2px] w-full bg-gray-200 mt-3 mb-5" />
      <div className="flex flex-col gap-6 px-5">
        <BillListItem />
        <BillListItem />
      </div>
    </div>
  )
}
