import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const gymsTable = pgTable("gyms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  address: text("address").notNull(),
  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),
  imageUrl: text("image_url"),
  imageUrls: jsonb("image_urls").$type<string[]>().default([]),
  credits: integer("credits").notNull().default(1),
  categories: jsonb("categories").$type<string[]>().default([]),
  operatingHours: jsonb("operating_hours").$type<Record<string, { open: string; close: string }>>(),
  amenities: jsonb("amenities").$type<string[]>().default([]),
  rating: doublePrecision("rating").default(4.5),
  reviewCount: integer("review_count").default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertGymSchema = createInsertSchema(gymsTable).omit({ id: true, createdAt: true });
export type InsertGym = z.infer<typeof insertGymSchema>;
export type Gym = typeof gymsTable.$inferSelect;

export const gymSlotsTable = pgTable("gym_slots", {
  id: serial("id").primaryKey(),
  gymId: integer("gym_id").notNull().references(() => gymsTable.id),
  date: text("date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  capacity: integer("capacity").notNull().default(20),
  bookedCount: integer("booked_count").notNull().default(0),
  isAvailable: boolean("is_available").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertGymSlotSchema = createInsertSchema(gymSlotsTable).omit({ id: true, createdAt: true });
export type InsertGymSlot = z.infer<typeof insertGymSlotSchema>;
export type GymSlot = typeof gymSlotsTable.$inferSelect;
