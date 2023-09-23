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
import { useEffect, useState } from "react"

export function AdminBillTable({ houses }: { houses: HouseResponse[] }) {
  const [selectedHouse, setSelectedHouse] = useState<HouseResponse>(houses[0])

  const [selectedOccupantId, setSelectedOccupantId] = useState<number>(
    houses[0].owner ? houses[0].owner.id : -1,
  )

  useEffect(() => {
    console.log("selectedHouse effect")
    setSelectedOccupantId(selectedHouse.owner?.id ?? -1)
  }, [selectedHouse])

  return (
    <>
      <div className="flex gap-4">
        <div>
          <Label>Rumah</Label>
          <Select
            onValueChange={(value) =>
              setSelectedHouse(
                houses.find((house) => house.id.toString() === value) ??
                  houses[0],
              )
            }
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
        <div>
          <Label>Pembayar</Label>
          <Select
            onValueChange={(value) => setSelectedOccupantId(parseInt(value))}
            value={selectedOccupantId.toString()}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {selectedHouse.owner && (
                <SelectItem
                  key={selectedHouse.owner.id}
                  value={selectedHouse.owner.id.toString()}
                >
                  {selectedHouse.owner.name}
                </SelectItem>
              )}
              {selectedHouse.renter && (
                <SelectItem
                  key={selectedHouse.renter.id}
                  value={selectedHouse.renter.id.toString()}
                >
                  {selectedHouse.renter.name}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="">
        <BillTable
          houseId={selectedHouse.id.toString()}
          occupantId={selectedOccupantId}
        />
      </div>
    </>
  )
}
