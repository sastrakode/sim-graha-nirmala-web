"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { occupantRoleType, occupantRoleTypes } from "@/lib/constants"
import { OccupantResponse } from "@/server/models/responses/occupant"
import { HouseResponse } from "@/server/models/responses/house"
import { useState } from "react"
import { editOccupantFormSchema } from "@/lib/schema"
import { normalizePhone } from "@/lib/utils"
import { putOccupant } from "@/lib/api"

const formSchema = editOccupantFormSchema

export function EditOccupantForm({
  occupant,
  houses,
}: {
  id: string
  occupant: OccupantResponse
  houses: HouseResponse[]
}) {
  const [filteredHouses, setFilteredHouses] = useState(
    filterHouses(occupant.role as occupantRoleType),
  )

  function filterHouses(type: occupantRoleType) {
    return houses.filter((house) => {
      if (house.id === occupant.house_id) return true

      switch (type) {
        case "owner":
          return house.owner === null

        case "renter":
          return house.renter === null
      }
    })
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      house_id: occupant.house_id.toString(),
      name: occupant.name,
      phone: occupant.phone,
      email: occupant.email ?? "",
      role: occupant.role as occupantRoleType,
    },
  })

  function onChangeRoleType(type: occupantRoleType) {
    setFilteredHouses(filterHouses(type))
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await putOccupant(occupant.id.toString(), values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipe</FormLabel>
              <Select
                onValueChange={(value) =>
                  field.onChange(onChangeRoleType(value as occupantRoleType))
                }
                defaultValue={occupant.role}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {occupantRoleTypes.map((type) => (
                    <SelectItem key={type.key} value={type.key}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="house_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rumah</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={occupant.house_id.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filteredHouses.map((house) => (
                    <SelectItem key={house.id} value={house.id.toString()}>
                      {house.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onBlur={(e) => {
                    field.onChange(e.target.value.trim())
                    field.onBlur()
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No. Telp</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onBlur={(e) => {
                    field.onChange(normalizePhone(e.target.value))
                    field.onBlur()
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Edit</Button>
      </form>
    </Form>
  )
}
