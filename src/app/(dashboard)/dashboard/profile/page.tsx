import { getOccupant } from "@/lib/api"
import { Metadata } from "next"
import { cookies } from "next/headers"

export const metadata: Metadata = {
  title: "Profil - SIMGN",
}

export default async function Profile() {
  const userId = cookies().get("userId")?.value || "1"

  const occupant = await getOccupant(userId)
  return <p>{occupant.data.id}</p>
}
