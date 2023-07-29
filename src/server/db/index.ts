import os from "os"
import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import * as schema from "./schema"
import { config } from "../config"

const maxOpenConnections = os.cpus().length
const maxLifetimeConnections = 30 * 60

const pool = postgres({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.pass,
  database: config.db.name,

  max: maxOpenConnections,
  keep_alive: maxOpenConnections,
  max_lifetime: maxLifetimeConnections,
  idle_timeout: maxLifetimeConnections,
})

export const db = drizzle(pool, { logger: true, schema: schema })

await migrate(db, {
  migrationsFolder: "./drizzle",
})
