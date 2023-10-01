"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, LoadingButton } from "@/components/ui/button"
import { capitalizeSentence } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Icons from "./icons"
import { postAnnouncementCategory } from "@/lib/api"
import { Input } from "./input"
import { Label } from "./label"
import { toast } from "sonner"

export default function AddAnnoucementCategoryAlertDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState("")

  const handleSubmit = async () => {
    setLoading(true)
    // just for notes, it's async, somehow will executed after fetch function below
    // but it handled by using capitalizeSentence in BE
    setName(capitalizeSentence(name))

    try {
      const [_, err] = await postAnnouncementCategory({ name: name })

      if (err) {
        return toast.error(err[0].message)
      }
    } finally {
      setLoading(false)
    }

    setOpen(false)
    setName("")
    router.refresh()
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>
          <Icons.Plus size={20} className="mr-1" />
          Tambah Kategori Pengumuman
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tambah Kategori Pengumuman</AlertDialogTitle>
          <Label htmlFor="categoryName">Nama Kategori</Label>
          <Input
            id="categoryName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <LoadingButton loading={loading} onClick={handleSubmit}>
            Tambah
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
