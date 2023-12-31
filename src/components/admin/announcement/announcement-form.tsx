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
import { AnnouncementResponse } from "@/server/models/responses/announcement"
import { AnnouncementCategoryResponse } from "@/server/models/responses/announcement-category"
import { StaffResponse } from "@/server/models/responses/staff"
import { Textarea } from "@/components/ui/textarea"
import { postAnnouncement, putAnnouncement } from "@/lib/api"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  title: z.string().nonempty("Judul harus diisi"),
  content: z.string().nonempty("Konten harus diisi"),
  announcement_category_id: z.coerce
    .number()
    .nonnegative("Kategori harus diisi"),
  author_id: z.coerce.number().nonnegative("Penulis harus diisi"),
})

export function AnnouncementForm({
  announcement,
  announcementCategories,
  authors,
}: {
  announcement?: AnnouncementResponse
  announcementCategories: AnnouncementCategoryResponse[]
  authors: StaffResponse[]
}) {
  const router = useRouter()
  const defaultValues = {
    title: announcement?.title ?? "",
    content: announcement?.content ?? "",
    announcement_category_id: announcement?.announcement_category_id ?? -1,
    author_id: announcement?.author_id ?? -1,
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (announcement) {
      const [_, errors] = await putAnnouncement(
        announcement.id.toString(),
        values,
      )

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
    } else {
      const [_, errors] = await postAnnouncement(values)

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

    router.replace("/admin/announcement")
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konten</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="announcement_category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={announcement?.announcement_category_id.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {announcementCategories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
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
          name="author_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Penulis</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={announcement?.author_id.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={author.id.toString()}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={form.formState.isSubmitting} type="submit">
          {announcement ? "Edit" : "Tambah"}
        </LoadingButton>
      </form>
    </Form>
  )
}
