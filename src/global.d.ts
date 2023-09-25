import { PostgresJsDatabase } from "drizzle-orm/postgres-js"
import * as schema from "@/server/db/schema"

export declare global {
  namespace globalThis {
    var _DB_CONNECTION: PostgresJsDatabase<typeof schema>
  }
}
