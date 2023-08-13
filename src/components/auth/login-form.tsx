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
import { occupantLogin } from "@/lib/api"

const formSchema = z.object({
  phone: z.string().min(1, "No. Telepon harus diisi"),
  password: z.string().min(1, "Kata Sandi harus diisi"),
})

export default function LoginForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const [res, errors] = await occupantLogin(values)
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
      setCookie("userId", res.occupant.id)
      setCookie("houseId", res.occupant.houseId)

      router.replace("/dashboard")
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
