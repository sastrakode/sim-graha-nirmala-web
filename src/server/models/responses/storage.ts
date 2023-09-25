import { TStorage } from "@/server/db/schema"
import { getObjectUrl } from "@/server/providers/minio"

export type StorageResponse = {
  id: number
  name: string
  ext: string
  token: string
  url: string
}

export async function toStorageResponse(
  storage?: TStorage,
): Promise<StorageResponse | null> {
  return storage
    ? {
        id: storage.id,
        name: storage.name,
        ext: storage.ext,
        token: storage.token,
        url: await getObjectUrl(storage),
      }
    : null
}
