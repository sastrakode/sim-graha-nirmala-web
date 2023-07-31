import os from "os"
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import * as schema from "./schema"
import { config } from "../config"
import { seed } from "./seed"

const maxOpenConnections = 2 * os.cpus().length
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

export let connection: PostgresJsDatabase<typeof schema>

async function setupDb() {
  await migrate(connection, {
    migrationsFolder: "./drizzle",
  })

  await seed()
}

export function db() {
  if (connection) return connection

  connection = drizzle(pool, { logger: true, schema: schema })
  setupDb()
    .then(() => {
      console.log("database setup success")
    })
    .catch((err) => {
      console.error("database setup failed:", err)
    })
    .finally(() => {
      console.log("database setup complete")
    })

  return connection
}
