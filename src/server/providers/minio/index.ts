import { config } from "@/server/config"
import { db } from "@/server/db"
import { Storage, TInsertStorage, TStorage } from "@/server/db/schema"
import * as Minio from "minio"
import path from "path"

let connection: Minio.Client
const bucketName = config.minio.bucket

function getConnection() {
  if (connection) return connection
  connection = new Minio.Client({
    endPoint: config.minio.host,
    port: config.minio.port,
    useSSL: false,
    accessKey: config.minio.accessKey,
    secretKey: config.minio.secretKey,
  })

  connection.bucketExists(bucketName, (err, exists) => {
    if (err) throw err
    if (!exists) connection.makeBucket(bucketName, () => {})
  })

  return connection
}

function minio() {
  if (process.env.NODE_ENV === "production") return getConnection()

  if (!global._MINIO_CONNECTION) global._MINIO_CONNECTION = getConnection()
  return global._MINIO_CONNECTION
}

export async function putObject(file: File) {
  const { name, ext } = path.parse(file.name)
  const storage: TInsertStorage = {
    name: name,
    ext: ext,
  }

  const [newStorage] = await db().insert(Storage).values(storage).returning()
  const objectName = newStorage.token + storage.ext
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  await minio().putObject(bucketName, objectName, buffer)
  return newStorage
}

export async function getObjectUrl(storage: TStorage) {
  const objectName = storage.token + storage.ext
  return await minio().presignedGetObject(bucketName, objectName)
}
