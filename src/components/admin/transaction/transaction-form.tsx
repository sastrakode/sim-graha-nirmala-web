"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"

import { LoadingButton } from "@/components/ui/button"
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
import { postCashflow } from "@/lib/api"
import { useRouter } from "next/navigation"
import { CashflowResponse } from "@/server/models/responses/cashflow"

const formSchema = z.object({
  title: z.string().nonempty("Judul harus diisi"),
  description: z
    .string()
    .optional()
    .transform((value) =>
      value ? (value.length > 0 ? value : undefined) : undefined,
    )
    .pipe(z.string().min(1).optional()),
  movement: z.string().nonempty("Tipe harus diisi"),
  amount: z.coerce.number().nonnegative(),
})

const flowTypes = [
  {
    key: "outcome",
    name: "Pengeluaran",
  },
  {
    key: "income",
    name: "Pemasukan",
  },
]

export function TransactionForm({ cashflow }: { cashflow?: CashflowResponse }) {
  const router = useRouter()
  const defaultValues = {
    title: cashflow?.title ?? "",
    description: cashflow?.description ?? "",
    movement: cashflow?.movement ?? "",
    amount: cashflow?.amount ?? 0,
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (cashflow) {
      // const [_, errors] = await putHouse(cashflow.id.toString(), values)
      // if (errors) {
      //   errors.forEach((error) => {
      //     if (error.field) {
      //       form.setError(error.field as any, {
      //         type: "server",
      //         message: error.message,
      //       })
      //     }
      //   })
      //   return
      // }
    } else {
      const [_, errors] = await postCashflow(values)

      if (errors) {
        errors.forEach((error) => {
          if (error.field) {
            form.setError(error.field as any, {
              type: "server",
              message: error.message,
            })
          }
        })

        return
      }
    }

    router.replace("/admin/transaction")
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="movement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipe</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={cashflow?.movement}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {flowTypes.map((type, idx) => (
                    <SelectItem key={idx} value={type.key}>
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={form.formState.isSubmitting} type="submit">
          {cashflow ? "Edit" : "Tambah"}
        </LoadingButton>
      </form>
    </Form>
  )
}
