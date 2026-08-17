import { pgTable, text, serial, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const slideshows = pgTable("slideshows", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  linkUrl: text("link_url"),
  isActive: boolean("is_active").default(true).notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
