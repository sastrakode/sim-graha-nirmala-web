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

export type _House = InferModel<typeof House>
export type _InsertHouse = InferModel<typeof House, "insert">

export const Role = pgTable("role", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  code: text("code").unique().notNull(),
  name: text("name").unique().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
})

export type _Role = InferModel<typeof Role>
export type _InsertRole = InferModel<typeof Role, "insert">

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

export type _Staff = InferModel<typeof Staff>
export type _InsertStaff = InferModel<typeof Staff, "insert">
