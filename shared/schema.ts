import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const membershipTypes = [
  'entrepreneur',
  'student',
  'campus_innovator',
  'business',
  'investor',
  'institutional'
] as const;

export const membershipApplications = pgTable("membership_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  membershipType: text("membership_type").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  organization: text("organization"),
  designation: text("designation"),
  linkedIn: text("linkedin"),
  reason: text("reason").notNull(),
  status: text("status").notNull().default('pending'),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMembershipApplicationSchema = createInsertSchema(membershipApplications).omit({
  id: true,
  status: true,
  createdAt: true,
}).extend({
  membershipType: z.enum(membershipTypes),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  fullName: z.string().min(2, "Full name is required"),
  reason: z.string().min(20, "Please provide at least 20 characters explaining why you want to join"),
});

export type InsertMembershipApplication = z.infer<typeof insertMembershipApplicationSchema>;
export type MembershipApplication = typeof membershipApplications.$inferSelect;
