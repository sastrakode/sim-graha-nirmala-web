import { InferModel } from "drizzle-orm"
import { bigserial, pgTable, text, timestamp } from "drizzle-orm/pg-core"

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
