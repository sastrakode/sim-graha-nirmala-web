import { Button } from "@/components/ui/button"
import { fetchErrorString, getHouse, getOccupant } from "@/lib/api"
import { MailIcon, Phone } from "lucide-react"
import { Metadata } from "next"
import { cookies } from "next/headers"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Profil - SIMGN",
}

export default async function Profile() {
  const userId = cookies().get("userId")?.value || "-1"
  const houseId = cookies().get("houseId")?.value || "-1"

  const role: { [key: string]: string } = {
    owner: "Pemilik",
    renter: "Penyewa",
  }

  const [occupant, house] = await Promise.all([
    getOccupant(userId),
    getHouse(houseId),
  ])

  if (fetchErrorString in occupant || fetchErrorString in house) {
    throw new Error("Something went wrong")
  }

  return (
    <div className="flex flex-col md:flex-row gap-12 md:gap-6 m-6">
      <div className="md:basis-1/2">
        <div className="flex bg-white rounded-3xl gap-6 p-8 items-center w-fit mx-auto md:mx-0">
          <div className="relative h-16 w-16">
            <Image
              src="/images/default-user.svg"
              alt="Foto profil"
              fill={true}
              style={{ borderRadius: "100%" }}
            />
          </div>
          <div className="">
            <p className="text-lg text-primary font-bold">{occupant.name}</p>
            <p className="text-gray-400">{role[occupant.role ?? "owner"]}</p>
            <p className="text-gray-400">{house.address}</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl mt-6 p-4">
          <div className="flex justify-between items-end">
            <p className="text-primary font-semibold">Informasi Kontak</p>
            <Button variant="outline" size="sm">
              Ubah
            </Button>
          </div>
          <div className="h-[2px] w-full bg-gray-200 mt-3 mb-5" />
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <MailIcon />
                <p>Email</p>
              </div>
              <p className="text-gray-500">{occupant.email}</p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Phone />
                <p>No. Telp</p>
              </div>
              <p className="text-gray-500">{occupant.phone}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:basis-1/2 hidden">
        <div className="flex bg-white rounded-3xl gap-6 p-8 items-center w-fit mx-auto md:mx-0">
          <div className="relative h-16 w-16">
            <Image
              src="/images/default-user.svg"
              alt="Foto profil"
              fill={true}
              style={{ borderRadius: "100%" }}
            />
          </div>
          <div className="">
            <p className="text-lg text-primary font-bold">Yossan Rahmadi</p>
            <p className="text-gray-400">Pemilik</p>
            <p className="text-gray-400">A12, Jl. Teras Rumah</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl mt-6 p-4">
          <div className="flex justify-between items-end">
            <p className="text-primary font-semibold">Informasi Kontak</p>
            <Button variant="outline" size="sm">
              Ubah
            </Button>
          </div>
          <div className="h-[2px] w-full bg-gray-200 mt-3 mb-5" />
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <MailIcon />
                <p>Email</p>
              </div>
              <p className="text-gray-500">yossan@email.com</p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Phone />
                <p>No. Telp</p>
              </div>
              <p className="text-gray-500">081258857674</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
