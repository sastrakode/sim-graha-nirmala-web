import { eq } from "drizzle-orm"
import { db } from "."
import { Role, Staff } from "./schema"
import { hashPassword } from "../security/password"

export async function seed() {
  const roles = ["admin", "secretary", "treasurer", "security_guard"]
  for (const role of roles) {
    let roleExists = await db().query.Role.findFirst({
      where: eq(Role.code, role),
    })
    if (!roleExists) {
      await db()
        .insert(Role)
        .values({
          code: role,
          name: role
            .split("_")
            .map((r) => r.charAt(0).toUpperCase() + r.slice(1))
            .join(" "),
        })
    }
  }

  let role = await db().query.Role.findFirst({ where: eq(Role.code, "admin") })
  let staff = await db().query.Staff.findFirst({
    where: eq(Staff.roleId, role?.id!),
  })
  if (!staff) {
    await db()
      .insert(Staff)
      .values({
        roleId: role?.id!,
        name: "Admin",
        email: "admin@email.com",
        phone: "085108510851",
        password: await hashPassword("supersecret"),
      })
  }
}
