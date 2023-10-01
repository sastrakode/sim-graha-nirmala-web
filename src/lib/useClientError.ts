import { useEffect, useState } from "react"

export default function useClientError() {
  const [err, setErr] = useState<unknown>(null)

  useEffect(() => {
    if (err) throw err
  }, [err])

  return [setErr]
}
