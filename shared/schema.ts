import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, index, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const resources = pgTable("resources", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  link: text("link"),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resources.$inferSelect;

export const programs = pgTable("programs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  eligibility: text("eligibility"),
  duration: text("duration"),
  benefits: text("benefits").array(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProgramSchema = createInsertSchema(programs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertProgram = z.infer<typeof insertProgramSchema>;
export type Program = typeof programs.$inferSelect;

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  registrationLink: text("registration_link"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  date: z.coerce.date(),
});
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export const membershipPlans = pgTable("membership_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(),
  price: text("price").notNull(),
  description: text("description").notNull(),
  benefits: text("benefits").array(),
  isActive: boolean("is_active").notNull().default(true),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertMembershipPlanSchema = createInsertSchema(membershipPlans).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertMembershipPlan = z.infer<typeof insertMembershipPlanSchema>;
export type MembershipPlan = typeof membershipPlans.$inferSelect;

export const applyFormSubmissions = pgTable("apply_form_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  organization: text("organization"),
  programInterest: text("program_interest"),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertApplyFormSchema = createInsertSchema(applyFormSubmissions).omit({
  id: true,
  status: true,
  adminNotes: true,
  createdAt: true,
});
export type InsertApplyForm = z.infer<typeof insertApplyFormSchema>;
export type ApplyFormSubmission = typeof applyFormSubmissions.$inferSelect;

export const registerFormSubmissions = pgTable("register_form_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  membershipType: text("membership_type").notNull(),
  organization: text("organization"),
  designation: text("designation"),
  linkedIn: text("linkedin"),
  reason: text("reason").notNull(),
  status: text("status").notNull().default("pending"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRegisterFormSchema = createInsertSchema(registerFormSubmissions).omit({
  id: true,
  status: true,
  adminNotes: true,
  createdAt: true,
});
export type InsertRegisterForm = z.infer<typeof insertRegisterFormSchema>;
export type RegisterFormSubmission = typeof registerFormSubmissions.$inferSelect;

export const consultationSubmissions = pgTable("consultation_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  organization: text("organization"),
  consultationType: text("consultation_type"),
  preferredDate: text("preferred_date"),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertConsultationSchema = createInsertSchema(consultationSubmissions).omit({
  id: true,
  status: true,
  adminNotes: true,
  createdAt: true,
});
export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type ConsultationSubmission = typeof consultationSubmissions.$inferSelect;

export const advisorySessionSubmissions = pgTable("advisory_session_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  organization: text("organization"),
  sessionTopic: text("session_topic"),
  preferredDate: text("preferred_date"),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAdvisorySessionSchema = createInsertSchema(advisorySessionSubmissions).omit({
  id: true,
  status: true,
  adminNotes: true,
  createdAt: true,
});
export type InsertAdvisorySession = z.infer<typeof insertAdvisorySessionSchema>;
export type AdvisorySessionSubmission = typeof advisorySessionSubmissions.$inferSelect;

export const campusInviteSubmissions = pgTable("campus_invite_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  institution: text("institution").notNull(),
  designation: text("designation"),
  eventType: text("event_type"),
  preferredDate: text("preferred_date"),
  expectedAttendees: text("expected_attendees"),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCampusInviteSchema = createInsertSchema(campusInviteSubmissions).omit({
  id: true,
  status: true,
  adminNotes: true,
  createdAt: true,
});
export type InsertCampusInvite = z.infer<typeof insertCampusInviteSchema>;
export type CampusInviteSubmission = typeof campusInviteSubmissions.$inferSelect;

export const contactCategories = ["general", "partnership", "corporate", "campus"] as const;

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  category: text("category").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  status: text("status").notNull().default("pending"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  status: true,
  adminNotes: true,
  createdAt: true,
}).extend({
  category: z.enum(contactCategories),
});
export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export const emailReplies = pgTable("email_replies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  submissionId: text("submission_id").notNull(),
  submissionType: text("submission_type").notNull(),
  recipientEmail: text("recipient_email").notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  sentBy: text("sent_by").notNull(),
  sentAt: timestamp("sent_at").defaultNow(),
});

export const insertEmailReplySchema = createInsertSchema(emailReplies).omit({
  id: true,
  sentAt: true,
});
export type InsertEmailReply = z.infer<typeof insertEmailReplySchema>;
export type EmailReply = typeof emailReplies.$inferSelect;
