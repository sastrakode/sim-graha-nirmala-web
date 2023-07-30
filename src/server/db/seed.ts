import { eq } from "drizzle-orm"
import { db } from "."
import { Staff } from "./schema"
import { hashPassword } from "../security/password"

export async function seed() {
  let staff = await db().query.Staff.findFirst({
    where: eq(Staff.role, "admin"),
  })
  if (!staff) {
    await db()
      .insert(Staff)
      .values({
        name: "Admin",
        email: "admin@email.com",
        phone: "085108510851",
        password: await hashPassword("supersecret"),
        role: "admin",
      })
  }
}
