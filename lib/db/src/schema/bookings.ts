import { pgTable, text, serial, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";
import { gymsTable, gymSlotsTable } from "./gyms";

export const bookingStatusEnum = pgEnum("booking_status", ["confirmed", "cancelled", "used", "expired"]);

export const bookingsTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  gymId: integer("gym_id").notNull().references(() => gymsTable.id),
  slotId: integer("slot_id").references(() => gymSlotsTable.id),
  status: bookingStatusEnum("status").notNull().default("confirmed"),
  scheduledDate: text("scheduled_date").notNull(),
  startTime: text("start_time"),
  endTime: text("end_time"),
  qrCode: text("qr_code"),
  creditsUsed: integer("credits_used").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookingsTable).omit({ id: true, createdAt: true });
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookingsTable.$inferSelect;
