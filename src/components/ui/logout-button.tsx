"use client"

import { useRouter } from "next/navigation"
import { FC } from "react"

import { Button, ButtonProps } from "./button"
import { logout } from "@/lib/api"

export const LogoutButton: FC<ButtonProps> = ({ ...props }) => {
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

export default LogoutButton
