import LoginForm from "@/components/simgn/login-form"
import { Button } from "@/components/ui/button"

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center px-6 h-screen bg-primary">
      <h2 className="text-center text-white">SIM Graha Nirmala</h2>
      <div className="mt-9 bg-white rounded-3xl px-8 py-10 w-full md:w-1/2 lg:w-1/3">
        <h4 className="text-center">Login</h4>
        <LoginForm />
      </div>
    </div>
  )
}