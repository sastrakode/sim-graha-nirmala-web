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
}
