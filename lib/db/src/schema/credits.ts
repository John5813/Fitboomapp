import { pgTable, text, serial, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const creditTypeEnum = pgEnum("credit_type", ["earned", "spent", "refunded", "expired"]);
export const topupStatusEnum = pgEnum("topup_status", ["pending", "approved", "rejected"]);

export const creditTransactionsTable = pgTable("credit_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  amount: integer("amount").notNull(),
  type: creditTypeEnum("type").notNull(),
  description: text("description"),
  relatedBookingId: integer("related_booking_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCreditTransactionSchema = createInsertSchema(creditTransactionsTable).omit({ id: true, createdAt: true });
export type InsertCreditTransaction = z.infer<typeof insertCreditTransactionSchema>;
export type CreditTransaction = typeof creditTransactionsTable.$inferSelect;

export const topupOrdersTable = pgTable("topup_orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  amountCredits: integer("amount_credits").notNull(),
  amountUzs: integer("amount_uzs").notNull(),
  receiptUrl: text("receipt_url"),
  status: topupStatusEnum("status").notNull().default("pending"),
  adminNote: text("admin_note"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTopupOrderSchema = createInsertSchema(topupOrdersTable).omit({ id: true, createdAt: true });
export type InsertTopupOrder = z.infer<typeof insertTopupOrderSchema>;
export type TopupOrder = typeof topupOrdersTable.$inferSelect;
