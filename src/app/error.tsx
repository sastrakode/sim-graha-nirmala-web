"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("ocan", error)
  }, [error])
  return (
    <html>
      <body>
        <h2>Terjadi masalah!</h2>
        <button onClick={() => reset()}>Coba lagi</button>
      </body>
    </html>
  )
}
