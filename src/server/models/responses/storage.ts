import { TStorage } from "@/server/db/schema"

export type StorageResponse = {
  id: number
  name: string
  ext: string
  token: string
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
      }
    : null
}
