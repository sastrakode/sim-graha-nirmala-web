"use client"

import BillTable from "@/components/app/bill/bill-table"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { HouseResponse } from "@/server/models/responses/house"
import { useState } from "react"

export function AdminBillTable({ houses }: { houses: HouseResponse[] }) {
  const [selectedHouseId, setSelectedHouseId] = useState<string>(
    houses[0].id.toString(),
  )

  return (
    <>
      <div>
        <Label>Rumah</Label>
        <Select
          onValueChange={(value) => setSelectedHouseId(value)}
          defaultValue={houses[0].id.toString()}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {houses.map((house) => (
              <SelectItem key={house.id} value={house.id.toString()}>
                {house.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="">
        <BillTable houseId={selectedHouseId} paymentMethod="direct" />
      </div>
    </>
  )
}
