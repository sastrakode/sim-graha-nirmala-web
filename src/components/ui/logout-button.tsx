"use client"

import { useRouter } from "next/navigation"
import { Button } from "./button"

import { deleteCookie } from "cookies-next"

export default function LogoutButton({ ...props }) {
  const router = useRouter()

  const handleLogout = () => {
    deleteCookie("token")
    deleteCookie("userId")
    deleteCookie("houseId")
    router.replace("/login")
    router.refresh()
  }

  return (
    <Button variant={"destructive"} onClick={handleLogout} {...props}>
      Keluar
    </Button>
  )
}
