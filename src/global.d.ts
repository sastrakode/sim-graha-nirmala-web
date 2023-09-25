import { PostgresJsDatabase } from "drizzle-orm/postgres-js"
import * as schema from "@/server/db/schema"
import * as Minio from "minio"

export declare global {
  namespace globalThis {
    var _DB_CONNECTION: PostgresJsDatabase<typeof schema>
    var _MINIO_CONNECTION: Minio.Client
  }
}
