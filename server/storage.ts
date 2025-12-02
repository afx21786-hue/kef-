import { 
  users, resources, programs, events, membershipPlans,
  applyFormSubmissions, registerFormSubmissions, consultationSubmissions,
  advisorySessionSubmissions, campusInviteSubmissions, contactSubmissions, emailReplies,
  type User, type UpsertUser, type Resource, type InsertResource,
  type Program, type InsertProgram, type Event, type InsertEvent,
  type MembershipPlan, type InsertMembershipPlan,
  type ApplyFormSubmission, type InsertApplyForm,
  type RegisterFormSubmission, type InsertRegisterForm,
  type ConsultationSubmission, type InsertConsultation,
  type AdvisorySessionSubmission, type InsertAdvisorySession,
  type CampusInviteSubmission, type InsertCampusInvite,
  type ContactSubmission, type InsertContact,
  type EmailReply, type InsertEmailReply
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUserCount(): Promise<number>;

  getResources(): Promise<Resource[]>;
  getResource(id: string): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  updateResource(id: string, resource: Partial<InsertResource>): Promise<Resource | undefined>;
  deleteResource(id: string): Promise<boolean>;

  getPrograms(): Promise<Program[]>;
  getProgram(id: string): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  updateProgram(id: string, program: Partial<InsertProgram>): Promise<Program | undefined>;
  deleteProgram(id: string): Promise<boolean>;

  getEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;

  getMembershipPlans(): Promise<MembershipPlan[]>;
  getMembershipPlan(id: string): Promise<MembershipPlan | undefined>;
  createMembershipPlan(plan: InsertMembershipPlan): Promise<MembershipPlan>;
  updateMembershipPlan(id: string, plan: Partial<InsertMembershipPlan>): Promise<MembershipPlan | undefined>;
  deleteMembershipPlan(id: string): Promise<boolean>;

  getApplyFormSubmissions(): Promise<ApplyFormSubmission[]>;
  createApplyFormSubmission(submission: InsertApplyForm): Promise<ApplyFormSubmission>;
  updateApplyFormStatus(id: string, status: string, notes?: string): Promise<ApplyFormSubmission | undefined>;

  getRegisterFormSubmissions(): Promise<RegisterFormSubmission[]>;
  createRegisterFormSubmission(submission: InsertRegisterForm): Promise<RegisterFormSubmission>;
  updateRegisterFormStatus(id: string, status: string, notes?: string): Promise<RegisterFormSubmission | undefined>;

  getConsultationSubmissions(): Promise<ConsultationSubmission[]>;
  createConsultationSubmission(submission: InsertConsultation): Promise<ConsultationSubmission>;
  updateConsultationStatus(id: string, status: string, notes?: string): Promise<ConsultationSubmission | undefined>;

  getAdvisorySessionSubmissions(): Promise<AdvisorySessionSubmission[]>;
  createAdvisorySessionSubmission(submission: InsertAdvisorySession): Promise<AdvisorySessionSubmission>;
  updateAdvisorySessionStatus(id: string, status: string, notes?: string): Promise<AdvisorySessionSubmission | undefined>;

  getCampusInviteSubmissions(): Promise<CampusInviteSubmission[]>;
  createCampusInviteSubmission(submission: InsertCampusInvite): Promise<CampusInviteSubmission>;
  updateCampusInviteStatus(id: string, status: string, notes?: string): Promise<CampusInviteSubmission | undefined>;

  getContactSubmissions(category?: string): Promise<ContactSubmission[]>;
  createContactSubmission(submission: InsertContact): Promise<ContactSubmission>;
  updateContactStatus(id: string, status: string, notes?: string): Promise<ContactSubmission | undefined>;

  createEmailReply(reply: InsertEmailReply): Promise<EmailReply>;
  getEmailReplies(submissionId: string, submissionType: string): Promise<EmailReply[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getUserCount(): Promise<number> {
    const result = await db.select({ count: sql<number>`count(*)` }).from(users);
    return Number(result[0]?.count || 0);
  }

  async getResources(): Promise<Resource[]> {
    return db.select().from(resources).orderBy(desc(resources.createdAt));
  }

  async getResource(id: string): Promise<Resource | undefined> {
    const [resource] = await db.select().from(resources).where(eq(resources.id, id));
    return resource;
  }

  async createResource(resource: InsertResource): Promise<Resource> {
    const [created] = await db.insert(resources).values(resource).returning();
    return created;
  }

  async updateResource(id: string, resource: Partial<InsertResource>): Promise<Resource | undefined> {
    const [updated] = await db.update(resources)
      .set({ ...resource, updatedAt: new Date() })
      .where(eq(resources.id, id))
      .returning();
    return updated;
  }

  async deleteResource(id: string): Promise<boolean> {
    const result = await db.delete(resources).where(eq(resources.id, id));
    return true;
  }

  async getPrograms(): Promise<Program[]> {
    return db.select().from(programs).orderBy(desc(programs.createdAt));
  }

  async getProgram(id: string): Promise<Program | undefined> {
    const [program] = await db.select().from(programs).where(eq(programs.id, id));
    return program;
  }

  async createProgram(program: InsertProgram): Promise<Program> {
    const [created] = await db.insert(programs).values(program).returning();
    return created;
  }

  async updateProgram(id: string, program: Partial<InsertProgram>): Promise<Program | undefined> {
    const [updated] = await db.update(programs)
      .set({ ...program, updatedAt: new Date() })
      .where(eq(programs.id, id))
      .returning();
    return updated;
  }

  async deleteProgram(id: string): Promise<boolean> {
    await db.delete(programs).where(eq(programs.id, id));
    return true;
  }

  async getEvents(): Promise<Event[]> {
    return db.select().from(events).orderBy(desc(events.date));
  }

  async getEvent(id: string): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [created] = await db.insert(events).values(event).returning();
    return created;
  }

  async updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined> {
    const [updated] = await db.update(events)
      .set({ ...event, updatedAt: new Date() })
      .where(eq(events.id, id))
      .returning();
    return updated;
  }

  async deleteEvent(id: string): Promise<boolean> {
    await db.delete(events).where(eq(events.id, id));
    return true;
  }

  async getMembershipPlans(): Promise<MembershipPlan[]> {
    return db.select().from(membershipPlans).orderBy(membershipPlans.order);
  }

  async getMembershipPlan(id: string): Promise<MembershipPlan | undefined> {
    const [plan] = await db.select().from(membershipPlans).where(eq(membershipPlans.id, id));
    return plan;
  }

  async createMembershipPlan(plan: InsertMembershipPlan): Promise<MembershipPlan> {
    const [created] = await db.insert(membershipPlans).values(plan).returning();
    return created;
  }

  async updateMembershipPlan(id: string, plan: Partial<InsertMembershipPlan>): Promise<MembershipPlan | undefined> {
    const [updated] = await db.update(membershipPlans)
      .set({ ...plan, updatedAt: new Date() })
      .where(eq(membershipPlans.id, id))
      .returning();
    return updated;
  }

  async deleteMembershipPlan(id: string): Promise<boolean> {
    await db.delete(membershipPlans).where(eq(membershipPlans.id, id));
    return true;
  }

  async getApplyFormSubmissions(): Promise<ApplyFormSubmission[]> {
    return db.select().from(applyFormSubmissions).orderBy(desc(applyFormSubmissions.createdAt));
  }

  async createApplyFormSubmission(submission: InsertApplyForm): Promise<ApplyFormSubmission> {
    const [created] = await db.insert(applyFormSubmissions).values(submission).returning();
    return created;
  }

  async updateApplyFormStatus(id: string, status: string, notes?: string): Promise<ApplyFormSubmission | undefined> {
    const [updated] = await db.update(applyFormSubmissions)
      .set({ status, adminNotes: notes })
      .where(eq(applyFormSubmissions.id, id))
      .returning();
    return updated;
  }

  async getRegisterFormSubmissions(): Promise<RegisterFormSubmission[]> {
    return db.select().from(registerFormSubmissions).orderBy(desc(registerFormSubmissions.createdAt));
  }

  async createRegisterFormSubmission(submission: InsertRegisterForm): Promise<RegisterFormSubmission> {
    const [created] = await db.insert(registerFormSubmissions).values(submission).returning();
    return created;
  }

  async updateRegisterFormStatus(id: string, status: string, notes?: string): Promise<RegisterFormSubmission | undefined> {
    const [updated] = await db.update(registerFormSubmissions)
      .set({ status, adminNotes: notes })
      .where(eq(registerFormSubmissions.id, id))
      .returning();
    return updated;
  }

  async getConsultationSubmissions(): Promise<ConsultationSubmission[]> {
    return db.select().from(consultationSubmissions).orderBy(desc(consultationSubmissions.createdAt));
  }

  async createConsultationSubmission(submission: InsertConsultation): Promise<ConsultationSubmission> {
    const [created] = await db.insert(consultationSubmissions).values(submission).returning();
    return created;
  }

  async updateConsultationStatus(id: string, status: string, notes?: string): Promise<ConsultationSubmission | undefined> {
    const [updated] = await db.update(consultationSubmissions)
      .set({ status, adminNotes: notes })
      .where(eq(consultationSubmissions.id, id))
      .returning();
    return updated;
  }

  async getAdvisorySessionSubmissions(): Promise<AdvisorySessionSubmission[]> {
    return db.select().from(advisorySessionSubmissions).orderBy(desc(advisorySessionSubmissions.createdAt));
  }

  async createAdvisorySessionSubmission(submission: InsertAdvisorySession): Promise<AdvisorySessionSubmission> {
    const [created] = await db.insert(advisorySessionSubmissions).values(submission).returning();
    return created;
  }

  async updateAdvisorySessionStatus(id: string, status: string, notes?: string): Promise<AdvisorySessionSubmission | undefined> {
    const [updated] = await db.update(advisorySessionSubmissions)
      .set({ status, adminNotes: notes })
      .where(eq(advisorySessionSubmissions.id, id))
      .returning();
    return updated;
  }

  async getCampusInviteSubmissions(): Promise<CampusInviteSubmission[]> {
    return db.select().from(campusInviteSubmissions).orderBy(desc(campusInviteSubmissions.createdAt));
  }

  async createCampusInviteSubmission(submission: InsertCampusInvite): Promise<CampusInviteSubmission> {
    const [created] = await db.insert(campusInviteSubmissions).values(submission).returning();
    return created;
  }

  async updateCampusInviteStatus(id: string, status: string, notes?: string): Promise<CampusInviteSubmission | undefined> {
    const [updated] = await db.update(campusInviteSubmissions)
      .set({ status, adminNotes: notes })
      .where(eq(campusInviteSubmissions.id, id))
      .returning();
    return updated;
  }

  async getContactSubmissions(category?: string): Promise<ContactSubmission[]> {
    if (category) {
      return db.select().from(contactSubmissions)
        .where(eq(contactSubmissions.category, category))
        .orderBy(desc(contactSubmissions.createdAt));
    }
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async createContactSubmission(submission: InsertContact): Promise<ContactSubmission> {
    const [created] = await db.insert(contactSubmissions).values(submission).returning();
    return created;
  }

  async updateContactStatus(id: string, status: string, notes?: string): Promise<ContactSubmission | undefined> {
    const [updated] = await db.update(contactSubmissions)
      .set({ status, adminNotes: notes })
      .where(eq(contactSubmissions.id, id))
      .returning();
    return updated;
  }

  async createEmailReply(reply: InsertEmailReply): Promise<EmailReply> {
    const [created] = await db.insert(emailReplies).values(reply).returning();
    return created;
  }

  async getEmailReplies(submissionId: string, submissionType: string): Promise<EmailReply[]> {
    return db.select().from(emailReplies)
      .where(eq(emailReplies.submissionId, submissionId))
      .orderBy(desc(emailReplies.sentAt));
  }
}

export const storage = new DatabaseStorage();
