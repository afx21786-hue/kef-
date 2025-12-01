import { type User, type InsertUser, type MembershipApplication, type InsertMembershipApplication } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createMembershipApplication(application: InsertMembershipApplication): Promise<MembershipApplication>;
  getMembershipApplications(): Promise<MembershipApplication[]>;
  getMembershipApplicationByEmail(email: string): Promise<MembershipApplication | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private membershipApplications: Map<string, MembershipApplication>;

  constructor() {
    this.users = new Map();
    this.membershipApplications = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createMembershipApplication(insertApplication: InsertMembershipApplication): Promise<MembershipApplication> {
    const validTypes = ['entrepreneur', 'student', 'campus_innovator', 'business', 'investor', 'institutional'];
    if (!validTypes.includes(insertApplication.membershipType)) {
      throw new Error(`Invalid membership type: ${insertApplication.membershipType}`);
    }
    
    const id = randomUUID();
    const application: MembershipApplication = {
      id,
      membershipType: insertApplication.membershipType,
      fullName: insertApplication.fullName,
      email: insertApplication.email,
      phone: insertApplication.phone,
      organization: insertApplication.organization ?? null,
      designation: insertApplication.designation ?? null,
      linkedIn: insertApplication.linkedIn ?? null,
      reason: insertApplication.reason,
      status: 'pending',
      createdAt: new Date(),
    };
    this.membershipApplications.set(id, application);
    return application;
  }

  async getMembershipApplications(): Promise<MembershipApplication[]> {
    return Array.from(this.membershipApplications.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getMembershipApplicationByEmail(email: string): Promise<MembershipApplication | undefined> {
    return Array.from(this.membershipApplications.values()).find(
      (app) => app.email === email
    );
  }
}

export const storage = new MemStorage();
