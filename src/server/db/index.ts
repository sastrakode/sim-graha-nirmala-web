import os from "os"
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import * as schema from "./schema"
import { config } from "../config"
import { seed } from "./seed"
import { singleton } from "../utils/singleton"

const maxOpenConnections = 2 * os.cpus().length
const maxLifetimeConnections = 30 * 60

async function setupDb(conn: PostgresJsDatabase<typeof schema>) {
  await migrate(conn, {
    migrationsFolder: "./drizzle",
  })

  await seed(conn)
}

function getConnection() {
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

  const connection = drizzle(pool, { logger: true, schema: schema })
  setupDb(connection)
    .then(() => {
      console.log("database setup success")
    })
    .catch((err) => {
      console.log("database setup failed:", err)
    })
    .finally(() => {
      console.log("database setup complete")
    })

  return connection
}

export function db() {
  return singleton("db", getConnection)
}
