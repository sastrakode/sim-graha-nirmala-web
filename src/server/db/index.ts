import os from "os"
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres, { Sql } from "postgres"
import * as schema from "./schema"
import { config } from "../config"
import { seed } from "./seed"

const maxOpenConnections = 2 * os.cpus().length
const maxLifetimeConnections = 30 * 60

let pool: Sql
let connection: PostgresJsDatabase<typeof schema>

async function setupDb(conn: PostgresJsDatabase<typeof schema>) {
  await migrate(conn, {
    migrationsFolder: "./drizzle",
  })

  await seed(conn)
}

function getPool() {
  if (pool) return pool
  pool = postgres({
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

  return pool
}

function getConnection() {
  if (connection) return connection
  connection = drizzle(getPool(), { logger: true, schema: schema })
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
  if (process.env.NODE_ENV === "production") return getConnection()

  if (!global._DB_CONNECTION) global._DB_CONNECTION = getConnection()
  return global._DB_CONNECTION
}
