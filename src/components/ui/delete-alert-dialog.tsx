"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, LoadingButton } from "@/components/ui/button"
import { deleteOccupant } from "@/lib/api"
import { useState } from "react"

type Domain = "occupant" | "staff" | "house" | "announcement" | "transaction"

export default function DeleteAlertDialog({
  message,
  domain,
  id,
}: {
  message: string
  domain: Domain
  id: number
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    switch (domain) {
      case "occupant":
        await deleteOccupant(id)
        break

      case "staff":
        break
    }

    setLoading(false)
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Hapus
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <LoadingButton
            variant="destructive"
            loading={loading}
            onClick={handleDelete}
          >
            Hapus
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
