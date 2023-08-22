import LoginForm from "@/components/ui/login-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Login - SIMGN",
}

export default function AdminLoginPage() {
  return (
    <div className="flex flex-col justify-center items-center px-6 h-screen bg-primary">
      <h2 className="text-center text-white">Admin - SIM Graha Nirmala</h2>
      <div className="mt-9 bg-white rounded-3xl px-8 py-10 w-full md:w-1/2 lg:w-1/3">
        <h4 className="text-center">Login</h4>
        <LoginForm role="staff" />
      </div>
    </div>
  )
}
