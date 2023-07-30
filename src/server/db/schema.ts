import { InferModel } from "drizzle-orm"
import {
  bigint,
  bigserial,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

export const House = pgTable("house", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  code: text("code").unique().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
})

export type THouse = InferModel<typeof House>
export type TInsertHouse = InferModel<typeof House, "insert">

export const Role = pgTable("role", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  code: text("code").unique().notNull(),
  name: text("name").unique().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
})

export type TRole = InferModel<typeof Role>
export type TInsertRole = InferModel<typeof Role, "insert">

export const Staff = pgTable("staff", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  roleId: bigint("role_id", { mode: "number" })
    .notNull()
    .references(() => Role.id),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  phone: text("phone").unique().notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
})

export type TStaff = InferModel<typeof Staff>
export type TInsertStaff = InferModel<typeof Staff, "insert">
