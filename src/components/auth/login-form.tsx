"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { setCookie } from "cookies-next"

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
import { FetchError, occupantLogin, staffLogin } from "@/lib/api"
import { OccupantLogin, StaffLogin } from "@/lib/model"

const formSchema = z.object({
  phone: z.string().min(1, "No. Telepon harus diisi"),
  password: z.string().min(1, "Kata Sandi harus diisi"),
})

type LoginRole = "occupant" | "staff"

export default function LoginForm({ role }: { role: LoginRole }) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let result: [OccupantLogin | StaffLogin, FetchError]
    if (role === "occupant") {
      result = await occupantLogin(values)
    } else {
      result = await staffLogin(values)
    }

    const [res, errors] = result

    if (errors) {
      if (errors[0].includes("Phone")) {
        form.setError("phone", {
          type: "manual",
          message: "No. Hp tidak terdaftar",
        })
      } else if (errors[0].includes("Password")) {
        form.setError("password", {
          type: "manual",
          message: "Password salah",
        })
      }

      return
    }

    if (res.token) {
      setCookie("token", res.token)
      if ("occupant" in res) {
        setCookie("userId", res.occupant.id)
        setCookie("houseId", res.occupant.houseId)
        router.replace("/app/dashboard")
      } else {
        setCookie("userId", res.staff.id)
        router.replace("/admin")
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No. Telepon</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </Form>
  )
}
