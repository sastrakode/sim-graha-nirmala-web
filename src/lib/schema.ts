import * as z from "zod"

const userBaseSchema = {
  name: z.string().nonempty("Nama harus diisi"),
  phone: z
    .string()
    .nonempty("No. Telp harus diisi")
    .regex(new RegExp(/^08[1-9][0-9]{7,10}$/), "No. Telp tidak valid"),
  email: z.string().email("Email tidak valid").optional(),
}

export const addOccupantFormSchema = z
  .object({
    ...userBaseSchema,
    role: z.enum(["owner", "renter"]),
    house_id: z.coerce.number().nonnegative("Rumah harus diisi"),
    password: z
      .string()
      .nonempty("Password harus diisi")
      .min(8, "Minimal 8 karakter"),
    confirmPassword: z.string().nonempty("Konfirmasi password harus diisi"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  })

export const editOccupantFormSchema = z.object({
  ...userBaseSchema,
  role: z.enum(["owner", "renter"]),
  house_id: z.string().nonempty("Rumah harus diisi"),
})

export const addStaffFormSchema = z
  .object({
    ...userBaseSchema,
    role: z.enum(["admin", "secretary", "treasurer", "security_guard"]),
    password: z
      .string()
      .nonempty("Password harus diisi")
      .min(8, "Minimal 8 karakter"),
    confirmPassword: z.string().nonempty("Konfirmasi password harus diisi"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  })

export const editStaffFormSchema = z.object({
  ...userBaseSchema,
  role: z.enum(["admin", "secretary", "treasurer", "security_guard"]),
})
