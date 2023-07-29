import { config } from "./src/server/config"
import type { Config } from "drizzle-kit"

export default {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  out: "./drizzle",
  dbCredentials: {
    connectionString: `postgres://${config.db.user}:${config.db.pass}@${config.db.host}:${config.db.port}/${config.db.name}`,
  },
} satisfies Config
