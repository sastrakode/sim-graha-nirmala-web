import { eq } from "drizzle-orm"
import { connection } from "."
import { Staff } from "./schema"
import { hashPassword } from "../security/password"

export async function seed() {
  let adminStaff = await connection.query.Staff.findFirst({
    where: eq(Staff.role, "admin"),
  })
  if (!adminStaff) {
    await connection.insert(Staff).values({
      name: "Admin",
      phone: "085108510851",
      password: await hashPassword("supersecret"),
      role: "admin",
    })
  }
}
