"use client"

import { useRouter } from "next/navigation"
import { Button } from "./button"

import { logout } from "@/lib/api"

export default function LogoutButton({ ...props }) {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.replace("/login")
    router.refresh()
  }

  return (
    <Button variant={"destructive"} onClick={handleLogout} {...props}>
      Keluar
    </Button>
  )
}
