import { config } from "@/server/config"
import { db } from "@/server/db"
import { Storage, TInsertStorage } from "@/server/db/schema"
import { eq } from "drizzle-orm"
import Minio from "minio"
import path from "path"

let client: Minio.Client
const bucketName = config.minio.bucket

export function minioClient() {
  if (client) return client
  client = new Minio.Client({
    endPoint: config.minio.host,
    port: config.minio.port,
    useSSL: false,
    accessKey: config.minio.accessKey,
    secretKey: config.minio.secretKey,
  })

  client.bucketExists(bucketName, (err, exists) => {
    if (err) throw err
    if (!exists) client.makeBucket(bucketName, () => {})
  })

  return client
}

export async function storeObject(file: File) {
  const { name, ext } = path.parse(file.name)
  const bucket: TInsertStorage = {
    name: name,
    ext: ext,
  }

  const [newBucket] = await db().insert(Storage).values(bucket).returning()
  const objectName = newBucket.token + bucket.ext

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  minioClient().putObject(bucketName, objectName, buffer)
}

export async function getObject(storageId: number) {
  const bucket = await db().query.Storage.findFirst({
    where: eq(Storage.id, storageId),
  })
  if (!bucket) return null

  const objectName = bucket.token + bucket.ext
  const buffer = await minioClient().getObject(bucketName, objectName)
  return buffer.toString()
}
