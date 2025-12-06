import { 
  type User, type UpsertUser, type Resource, type InsertResource,
  type Program, type InsertProgram, type Event, type InsertEvent,
  type MembershipPlan, type InsertMembershipPlan,
  type ApplyFormSubmission, type InsertApplyForm,
  type RegisterFormSubmission, type InsertRegisterForm,
  type ConsultationSubmission, type InsertConsultation,
  type AdvisorySessionSubmission, type InsertAdvisorySession,
  type CampusInviteSubmission, type InsertCampusInvite,
  type ContactSubmission, type InsertContact
} from "@shared/schema";
import { FirestoreStorage } from "./firestoreStorage";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  upsertFirebaseUser(user: UpsertUser): Promise<User>;
  getUserCount(): Promise<number>;
  updateUserRole(id: string, role: string): Promise<User | undefined>;

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
  deleteApplyFormSubmission(id: string): Promise<boolean>;

  getRegisterFormSubmissions(): Promise<RegisterFormSubmission[]>;
  createRegisterFormSubmission(submission: InsertRegisterForm): Promise<RegisterFormSubmission>;
  updateRegisterFormStatus(id: string, status: string, notes?: string): Promise<RegisterFormSubmission | undefined>;
  deleteRegisterFormSubmission(id: string): Promise<boolean>;

  getConsultationSubmissions(): Promise<ConsultationSubmission[]>;
  createConsultationSubmission(submission: InsertConsultation): Promise<ConsultationSubmission>;
  updateConsultationStatus(id: string, status: string, notes?: string): Promise<ConsultationSubmission | undefined>;
  deleteConsultationSubmission(id: string): Promise<boolean>;

  getAdvisorySessionSubmissions(): Promise<AdvisorySessionSubmission[]>;
  createAdvisorySessionSubmission(submission: InsertAdvisorySession): Promise<AdvisorySessionSubmission>;
  updateAdvisorySessionStatus(id: string, status: string, notes?: string): Promise<AdvisorySessionSubmission | undefined>;
  deleteAdvisorySessionSubmission(id: string): Promise<boolean>;

  getCampusInviteSubmissions(): Promise<CampusInviteSubmission[]>;
  createCampusInviteSubmission(submission: InsertCampusInvite): Promise<CampusInviteSubmission>;
  updateCampusInviteStatus(id: string, status: string, notes?: string): Promise<CampusInviteSubmission | undefined>;
  deleteCampusInviteSubmission(id: string): Promise<boolean>;

  getContactSubmissions(category?: string): Promise<ContactSubmission[]>;
  createContactSubmission(submission: InsertContact): Promise<ContactSubmission>;
  updateContactStatus(id: string, status: string, notes?: string): Promise<ContactSubmission | undefined>;
  deleteContactSubmission(id: string): Promise<boolean>;
}

export const storage: IStorage = new FirestoreStorage();
