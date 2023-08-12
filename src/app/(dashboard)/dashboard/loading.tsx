import { Loader } from "lucide-react"

export default function Loading() {
  return (
    <div className="h-full flex flex-col justify-center items-center animate-pulse">
      <Loader className="animate-spin" />
      <p className="text-sm font-medium">Memuat...</p>
    </div>
  )
}
