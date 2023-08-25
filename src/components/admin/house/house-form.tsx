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
import { Input } from "@/components/ui/input"
import { postHouse, putHouse } from "@/lib/api"
import { useRouter } from "next/navigation"
import { HouseResponse } from "@/server/models/responses/house"

const formSchema = z.object({
  code: z.string(),
  address: z.string(),
})

export function HouseForm({ house }: { house?: HouseResponse }) {
  const router = useRouter()

  let defaultValues:
    | {
        code?: string
        address?: string
      }
    | undefined

  if (house) {
    defaultValues = {
      code: house.code,
      address: house.address,
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (house) {
      await putHouse(house.id.toString(), values)
    } else {
      await postHouse(values)
    }
    router.replace("/admin/house")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
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
