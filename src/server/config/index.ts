import * as dotenv from "dotenv"

dotenv.config({
  path: ".env",
})

type Config = {
  db: {
    host: string
    port: number
    user: string
    pass: string
    name: string
  }
  jwt: {
    secret: string
    expiresIn: string
  }
  midtrans: {
    clientKey: string
    serverKey: string
  }
  minio: {
    host: string
    port: number
    accessKey: string
    secretKey: string
    bucket: string
  }
}

const e = process.env

export const config: Config = {
  db: {
    host: e.DB_HOST!,
    port: parseInt(e.DB_PORT!),
    user: e.DB_USER!,
    pass: e.DB_PASS!,
    name: e.DB_NAME!,
  },
  jwt: {
    secret: e.JWT_SECRET!,
    expiresIn: e.JWT_EXPIRES_IN!,
  },
  midtrans: {
    clientKey: e.MIDTRANS_CLIENT_KEY!,
    serverKey: e.MIDTRANS_SERVER_KEY!,
  },
  minio: {
    host: e.MINIO_HOST!,
    port: parseInt(e.MINIO_PORT!),
    accessKey: e.MINIO_ACCESS_KEY!,
    secretKey: e.MINIO_SECRET_KEY!,
    bucket: e.MINIO_BUCKET!,
  },
}
