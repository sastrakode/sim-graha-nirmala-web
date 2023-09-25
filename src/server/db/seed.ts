import { eq } from "drizzle-orm"
import { Staff } from "./schema"
import { hashPassword } from "../security/password"
import { PostgresJsDatabase } from "drizzle-orm/postgres-js"
import * as schema from "./schema"

export async function seed(conn: PostgresJsDatabase<typeof schema>) {
  let adminStaff = await conn.query.Staff.findFirst({
    where: eq(Staff.role, "admin"),
  })
  if (!adminStaff) {
    await conn.insert(Staff).values({
      name: "Admin",
      phone: "085108510851",
      password: await hashPassword("supersecret"),
      role: "admin",
    })
  }
}
