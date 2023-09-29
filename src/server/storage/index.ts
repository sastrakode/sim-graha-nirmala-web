import fs from "fs"
import { writeFile } from "fs/promises"
import path from "path"
import { Storage, TInsertStorage } from "../db/schema"
import { db } from "../db"

const storageDirectory = "./storage/data"

function setupDirectory() {
  if (!fs.existsSync(storageDirectory)) {
    fs.mkdirSync(storageDirectory, { recursive: true })
  }
}

export async function uploadFile(file: File) {
  setupDirectory()
  const { name, ext } = path.parse(file.name)
  const storage: TInsertStorage = {
    name: name,
    ext: ext,
  }

  const [newStorage] = await db().insert(Storage).values(storage).returning()
  const objectName = newStorage.token + storage.ext
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  await writeFile(path.join(storageDirectory, objectName), buffer)
  return newStorage
}
