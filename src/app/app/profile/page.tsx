import { MailIcon, Phone, FileTextIcon } from "lucide-react"
import { Metadata } from "next"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import FamilyCardDialog from "@/components/app/profile/family-card-dialog"

import { getHouse } from "@/lib/api"
import { roleValue } from "@/lib/constants"
import { parseJwt } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Profil - SIMGN",
}

export default async function ProfilePage() {
  const houseId = cookies().get("houseId")?.value || "-1"
  const token = cookies().get("token")?.value || ""

  const { sub, role } = parseJwt(token)

  const [house, _houseErr] = await getHouse(houseId)

  if (!house) {
    notFound()
  }

  return (
    <div className="flex flex-col md:flex-row gap-12 md:gap-6 m-6">
      <div className="md:basis-1/2">
        <div className="bg-white rounded-3xl p-8 w-fit mx-auto md:mx-0">
          <div className="flex items-center gap-6 mb-2">
            <div className="relative h-16 w-16">
              <Image
                src="/images/default-user.svg"
                alt="Foto profil"
                fill={true}
                style={{ borderRadius: "100%" }}
              />
            </div>
            <div className="">
              <p className="text-lg text-primary font-bold">
                {house.owner?.name}
              </p>
              <p className="text-gray-400">{roleValue["owner"]}</p>
              <p className="text-gray-400">{house.address}</p>
            </div>
          </div>
          {role === "owner" && (
            <Button asChild>
              <Link href={`/app/profile/${sub}/family`}>
                Lihat Daftar Keluarga
              </Link>
            </Button>
          )}
        </div>
        <div className="bg-white rounded-3xl mt-6 p-4">
          <div className="flex justify-between items-end">
            <p className="text-primary font-semibold">Informasi Kontak</p>
            {role === "owner" && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Ubah
                </Button>
                <FamilyCardDialog occupantId={sub} />
              </div>
            )}
          </div>
          <div className="h-[2px] bg-gray-200 mt-3 mb-5" />
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <MailIcon />
                <p>Email</p>
              </div>
              <p className="text-gray-500">{house.owner?.email || "-"}</p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Phone />
                <p>No. Telp</p>
              </div>
              <p className="text-gray-500">{house.owner?.phone}</p>
            </div>
            {role === "owner" && (
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <FileTextIcon />
                  <p>Kartu Keluarga</p>
                </div>
                {house.is_owner_family_card_uploaded ? (
                  <a
                    href={`/occupant/${sub}/family-card`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary text-sm hover:underline"
                  >
                    Lihat Dokumen
                  </a>
                ) : (
                  <p>Belum diunggah</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`md:basis-1/2 ${!house.renter && "hidden"}`}>
        <div className="bg-white rounded-3xl p-8 w-fit mx-auto md:mx-0">
          <div className="flex items-center gap-6 mb-2">
            <div className="relative h-16 w-16">
              <Image
                src="/images/default-user.svg"
                alt="Foto profil"
                fill={true}
                style={{ borderRadius: "100%" }}
              />
            </div>
            <div className="">
              <p className="text-lg text-primary font-bold">
                {house.renter?.name}
              </p>
              <p className="text-gray-400">{roleValue["renter"]}</p>
              <p className="text-gray-400">{house.address}</p>
            </div>
          </div>
          {role === "renter" && (
            <Button asChild>
              <Link href="/app/profile/family">Lihat Daftar Keluarga</Link>
            </Button>
          )}
        </div>
        <div className="bg-white rounded-3xl mt-6 p-4">
          <div className="flex justify-between items-end">
            <p className="text-primary font-semibold">Informasi Kontak</p>
            {role === "renter" && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Ubah
                </Button>
                <FamilyCardDialog occupantId={sub} />
              </div>
            )}
          </div>
          <div className="h-[2px] bg-gray-200 mt-3 mb-5" />
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <MailIcon />
                <p>Email</p>
              </div>
              <p className="text-gray-500">{house.renter?.email}</p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Phone />
                <p>No. Telp</p>
              </div>
              <p className="text-gray-500">{house.renter?.phone}</p>
            </div>
            {role === "renter" && (
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <FileTextIcon />
                  <p>Kartu Keluarga</p>
                </div>
                {house.is_renter_family_card_uploaded ? (
                  <a
                    href={`/occupant/${sub}/family-card`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary text-sm hover:underline"
                  >
                    Lihat Dokumen
                  </a>
                ) : (
                  <p>Belum diunggah</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
