import admin from 'firebase-admin';
import { 
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
import type { IStorage } from "./storage";

const projectId = process.env.VITE_FIREBASE_PROJECT_ID || 'kerala-economic-form';

function initializeFirebaseAdmin() {
  try {
    admin.app();
  } catch {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    
    if (serviceAccountKey) {
      try {
        // Handle potential escape issues with the JSON
        let cleanedKey = serviceAccountKey.trim();
        
        // If it starts with a quote, it might be double-escaped
        if (cleanedKey.startsWith('"') && cleanedKey.endsWith('"')) {
          cleanedKey = cleanedKey.slice(1, -1);
        }
        
        // Handle escaped characters that might cause issues
        // First, protect the \n sequences in private_key by temporarily replacing them
        cleanedKey = cleanedKey.replace(/\\\\n/g, '___NEWLINE___');
        
        // Remove any actual newlines/carriage returns that shouldn't be there
        cleanedKey = cleanedKey.replace(/[\r\n]/g, '');
        
        // Restore the \n sequences
        cleanedKey = cleanedKey.replace(/___NEWLINE___/g, '\\n');
        
        const serviceAccount = JSON.parse(cleanedKey);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          projectId: serviceAccount.project_id || projectId,
        });
        console.log('Firebase Admin SDK initialized with service account');
      } catch (parseError) {
        console.error('Failed to parse service account key:', parseError);
        console.log('Initializing Firebase without credentials (limited functionality)');
        admin.initializeApp({ projectId: projectId });
      }
    } else {
      console.log('No service account key found, initializing without credentials');
      admin.initializeApp({ projectId: projectId });
    }
  }
}

initializeFirebaseAdmin();

function generateId(): string {
  return crypto.randomUUID();
}

function toDate(value: any): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (value._seconds !== undefined) {
    return new Date(value._seconds * 1000);
  }
  if (typeof value === 'string') return new Date(value);
  return null;
}

function firestoreTimestamp() {
  return admin.firestore.FieldValue.serverTimestamp();
}

// Remove undefined values from objects before writing to Firestore
// Firestore doesn't accept undefined values
function sanitizeForFirestore<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: Partial<T> = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
}

export class FirestoreStorage implements IStorage {
  private db: admin.firestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  async getUser(id: string): Promise<User | undefined> {
    const doc = await this.db.collection('users').doc(id).get();
    if (!doc.exists) return undefined;
    const data = doc.data()!;
    return {
      id: doc.id,
      email: data.email || null,
      firstName: data.firstName || null,
      lastName: data.lastName || null,
      profileImageUrl: data.profileImageUrl || null,
      role: data.role || 'user',
      createdAt: toDate(data.createdAt),
      updatedAt: toDate(data.updatedAt),
    };
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const id = userData.id || generateId();
    const now = firestoreTimestamp();
    const docRef = this.db.collection('users').doc(id);
    const doc = await docRef.get();
    
    if (doc.exists) {
      const updateData = sanitizeForFirestore({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImageUrl: userData.profileImageUrl,
        updatedAt: now,
      });
      await docRef.update(updateData);
    } else {
      const setData = sanitizeForFirestore({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImageUrl: userData.profileImageUrl,
        role: userData.role || 'user',
        createdAt: now,
        updatedAt: now,
      });
      await docRef.set(setData);
    }
    
    return (await this.getUser(id))!;
  }

  async getUserCount(): Promise<number> {
    const snapshot = await this.db.collection('users').count().get();
    return snapshot.data().count;
  }

  async upsertFirebaseUser(userData: UpsertUser): Promise<User> {
    const id = userData.id!;
    const now = firestoreTimestamp();
    const docRef = this.db.collection('users').doc(id);
    const doc = await docRef.get();
    
    if (doc.exists) {
      const updateData = sanitizeForFirestore({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImageUrl: userData.profileImageUrl,
        updatedAt: now,
      });
      await docRef.update(updateData);
    } else {
      const setData = sanitizeForFirestore({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImageUrl: userData.profileImageUrl,
        role: userData.role || 'user',
        createdAt: now,
        updatedAt: now,
      });
      await docRef.set(setData);
    }
    
    return (await this.getUser(id))!;
  }

  async getResources(): Promise<Resource[]> {
    const snapshot = await this.db.collection('resources')
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        category: data.category,
        link: data.link || null,
        imageUrl: data.imageUrl || null,
        isActive: data.isActive ?? true,
        createdAt: toDate(data.createdAt),
        updatedAt: toDate(data.updatedAt),
      };
    });
  }

  async getResource(id: string): Promise<Resource | undefined> {
    const doc = await this.db.collection('resources').doc(id).get();
    if (!doc.exists) return undefined;
    const data = doc.data()!;
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      category: data.category,
      link: data.link || null,
      imageUrl: data.imageUrl || null,
      isActive: data.isActive ?? true,
      createdAt: toDate(data.createdAt),
      updatedAt: toDate(data.updatedAt),
    };
  }

  async createResource(resource: InsertResource): Promise<Resource> {
    const id = generateId();
    const now = firestoreTimestamp();
    const setData = sanitizeForFirestore({
      ...resource,
      isActive: resource.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    });
    await this.db.collection('resources').doc(id).set(setData);
    return (await this.getResource(id))!;
  }

  async updateResource(id: string, resource: Partial<InsertResource>): Promise<Resource | undefined> {
    const docRef = this.db.collection('resources').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return undefined;
    
    const updateData = sanitizeForFirestore({
      ...resource,
      updatedAt: firestoreTimestamp(),
    });
    await docRef.update(updateData);
    return this.getResource(id);
  }

  async deleteResource(id: string): Promise<boolean> {
    await this.db.collection('resources').doc(id).delete();
    return true;
  }

  async getPrograms(): Promise<Program[]> {
    const snapshot = await this.db.collection('programs')
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        category: data.category,
        eligibility: data.eligibility || null,
        duration: data.duration || null,
        benefits: data.benefits || null,
        imageUrl: data.imageUrl || null,
        isActive: data.isActive ?? true,
        createdAt: toDate(data.createdAt),
        updatedAt: toDate(data.updatedAt),
      };
    });
  }

  async getProgram(id: string): Promise<Program | undefined> {
    const doc = await this.db.collection('programs').doc(id).get();
    if (!doc.exists) return undefined;
    const data = doc.data()!;
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      category: data.category,
      eligibility: data.eligibility || null,
      duration: data.duration || null,
      benefits: data.benefits || null,
      imageUrl: data.imageUrl || null,
      isActive: data.isActive ?? true,
      createdAt: toDate(data.createdAt),
      updatedAt: toDate(data.updatedAt),
    };
  }

  async createProgram(program: InsertProgram): Promise<Program> {
    const id = generateId();
    const now = firestoreTimestamp();
    const setData = sanitizeForFirestore({
      ...program,
      isActive: program.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    });
    await this.db.collection('programs').doc(id).set(setData);
    return (await this.getProgram(id))!;
  }

  async updateProgram(id: string, program: Partial<InsertProgram>): Promise<Program | undefined> {
    const docRef = this.db.collection('programs').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return undefined;
    
    const updateData = sanitizeForFirestore({
      ...program,
      updatedAt: firestoreTimestamp(),
    });
    await docRef.update(updateData);
    return this.getProgram(id);
  }

  async deleteProgram(id: string): Promise<boolean> {
    await this.db.collection('programs').doc(id).delete();
    return true;
  }

  async getEvents(): Promise<Event[]> {
    const snapshot = await this.db.collection('events')
      .orderBy('date', 'desc')
      .get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        date: toDate(data.date)!,
        location: data.location,
        category: data.category,
        imageUrl: data.imageUrl || null,
        registrationLink: data.registrationLink || null,
        isActive: data.isActive ?? true,
        createdAt: toDate(data.createdAt),
        updatedAt: toDate(data.updatedAt),
      };
    });
  }

  async getEvent(id: string): Promise<Event | undefined> {
    const doc = await this.db.collection('events').doc(id).get();
    if (!doc.exists) return undefined;
    const data = doc.data()!;
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      date: toDate(data.date)!,
      location: data.location,
      category: data.category,
      imageUrl: data.imageUrl || null,
      registrationLink: data.registrationLink || null,
      isActive: data.isActive ?? true,
      createdAt: toDate(data.createdAt),
      updatedAt: toDate(data.updatedAt),
    };
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const id = generateId();
    const now = firestoreTimestamp();
    const setData = sanitizeForFirestore({
      ...event,
      date: event.date instanceof Date ? admin.firestore.Timestamp.fromDate(event.date) : event.date,
      isActive: event.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    });
    await this.db.collection('events').doc(id).set(setData);
    return (await this.getEvent(id))!;
  }

  async updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined> {
    const docRef = this.db.collection('events').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return undefined;
    
    const updateData: any = { ...event, updatedAt: firestoreTimestamp() };
    if (event.date instanceof Date) {
      updateData.date = admin.firestore.Timestamp.fromDate(event.date);
    }
    
    await docRef.update(sanitizeForFirestore(updateData));
    return this.getEvent(id);
  }

  async deleteEvent(id: string): Promise<boolean> {
    await this.db.collection('events').doc(id).delete();
    return true;
  }

  async getMembershipPlans(): Promise<MembershipPlan[]> {
    const snapshot = await this.db.collection('membershipPlans')
      .orderBy('order', 'asc')
      .get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        type: data.type,
        price: data.price,
        description: data.description,
        benefits: data.benefits || null,
        isActive: data.isActive ?? true,
        order: data.order ?? 0,
        createdAt: toDate(data.createdAt),
        updatedAt: toDate(data.updatedAt),
      };
    });
  }

  async getMembershipPlan(id: string): Promise<MembershipPlan | undefined> {
    const doc = await this.db.collection('membershipPlans').doc(id).get();
    if (!doc.exists) return undefined;
    const data = doc.data()!;
    return {
      id: doc.id,
      name: data.name,
      type: data.type,
      price: data.price,
      description: data.description,
      benefits: data.benefits || null,
      isActive: data.isActive ?? true,
      order: data.order ?? 0,
      createdAt: toDate(data.createdAt),
      updatedAt: toDate(data.updatedAt),
    };
  }

  async createMembershipPlan(plan: InsertMembershipPlan): Promise<MembershipPlan> {
    const id = generateId();
    const now = firestoreTimestamp();
    const setData = sanitizeForFirestore({
      ...plan,
      isActive: plan.isActive ?? true,
      order: plan.order ?? 0,
      createdAt: now,
      updatedAt: now,
    });
    await this.db.collection('membershipPlans').doc(id).set(setData);
    return (await this.getMembershipPlan(id))!;
  }

  async updateMembershipPlan(id: string, plan: Partial<InsertMembershipPlan>): Promise<MembershipPlan | undefined> {
    const docRef = this.db.collection('membershipPlans').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return undefined;
    
    const updateData = sanitizeForFirestore({
      ...plan,
      updatedAt: firestoreTimestamp(),
    });
    await docRef.update(updateData);
    return this.getMembershipPlan(id);
  }

  async deleteMembershipPlan(id: string): Promise<boolean> {
    await this.db.collection('membershipPlans').doc(id).delete();
    return true;
  }

  async getApplyFormSubmissions(): Promise<ApplyFormSubmission[]> {
    const snapshot = await this.db.collection('applyFormSubmissions')
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        organization: data.organization || null,
        programInterest: data.programInterest || null,
        message: data.message || null,
        status: data.status || 'pending',
        adminNotes: data.adminNotes || null,
        createdAt: toDate(data.createdAt),
      };
    });
  }

  async createApplyFormSubmission(submission: InsertApplyForm): Promise<ApplyFormSubmission> {
    const id = generateId();
    const now = firestoreTimestamp();
    const setData = sanitizeForFirestore({
      ...submission,
      status: 'pending',
      adminNotes: null,
      createdAt: now,
    });
    await this.db.collection('applyFormSubmissions').doc(id).set(setData);
    const doc = await this.db.collection('applyFormSubmissions').doc(id).get();
    const data = doc.data()!;
    return {
      id: doc.id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      organization: data.organization || null,
      programInterest: data.programInterest || null,
      message: data.message || null,
      status: data.status || 'pending',
      adminNotes: data.adminNotes || null,
      createdAt: toDate(data.createdAt),
    };
  }

  async updateApplyFormStatus(id: string, status: string, notes?: string): Promise<ApplyFormSubmission | undefined> {
    const docRef = this.db.collection('applyFormSubmissions').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return undefined;
    
    await docRef.update({
      status,
      adminNotes: notes || null,
    });
    
    const updated = await docRef.get();
    const data = updated.data()!;
    return {
      id: updated.id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      organization: data.organization || null,
      programInterest: data.programInterest || null,
      message: data.message || null,
      status: data.status || 'pending',
      adminNotes: data.adminNotes || null,
      createdAt: toDate(data.createdAt),
    };
  }

  async getRegisterFormSubmissions(): Promise<RegisterFormSubmission[]> {
    const snapshot = await this.db.collection('registerFormSubmissions')
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        membershipType: data.membershipType,
        organization: data.organization || null,
        designation: data.designation || null,
        linkedIn: data.linkedIn || null,
        reason: data.reason,
        status: data.status || 'pending',
        adminNotes: data.adminNotes || null,
        createdAt: toDate(data.createdAt),
      };
    });
  }

  async createRegisterFormSubmission(submission: InsertRegisterForm): Promise<RegisterFormSubmission> {
    const id = generateId();
    const now = firestoreTimestamp();
    const setData = sanitizeForFirestore({
      ...submission,
      status: 'pending',
      adminNotes: null,
      createdAt: now,
    });
    await this.db.collection('registerFormSubmissions').doc(id).set(setData);
    const doc = await this.db.collection('registerFormSubmissions').doc(id).get();
    const data = doc.data()!;
    return {
      id: doc.id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      membershipType: data.membershipType,
      organization: data.organization || null,
      designation: data.designation || null,
      linkedIn: data.linkedIn || null,
      reason: data.reason,
      status: data.status || 'pending',
      adminNotes: data.adminNotes || null,
      createdAt: toDate(data.createdAt),
    };
  }

  async updateRegisterFormStatus(id: string, status: string, notes?: string): Promise<RegisterFormSubmission | undefined> {
    const docRef = this.db.collection('registerFormSubmissions').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return undefined;
    
    await docRef.update({
      status,
      adminNotes: notes || null,
    });
    
    const updated = await docRef.get();
    const data = updated.data()!;
    return {
      id: updated.id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      membershipType: data.membershipType,
      organization: data.organization || null,
      designation: data.designation || null,
      linkedIn: data.linkedIn || null,
      reason: data.reason,
      status: data.status || 'pending',
      adminNotes: data.adminNotes || null,
      createdAt: toDate(data.createdAt),
    };
  }

  async getConsultationSubmissions(): Promise<ConsultationSubmission[]> {
    const snapshot = await this.db.collection('consultationSubmissions')
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        organization: data.organization || null,
        consultationType: data.consultationType || null,
        preferredDate: data.preferredDate || null,
        message: data.message || null,
        status: data.status || 'pending',
        adminNotes: data.adminNotes || null,
        createdAt: toDate(data.createdAt),
      };
    });
  }

  async createConsultationSubmission(submission: InsertConsultation): Promise<ConsultationSubmission> {
    const id = generateId();
    const now = firestoreTimestamp();
    const setData = sanitizeForFirestore({
      ...submission,
      status: 'pending',
      adminNotes: null,
      createdAt: now,
    });
    await this.db.collection('consultationSubmissions').doc(id).set(setData);
    const doc = await this.db.collection('consultationSubmissions').doc(id).get();
    const data = doc.data()!;
    return {
      id: doc.id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      organization: data.organization || null,
      consultationType: data.consultationType || null,
      preferredDate: data.preferredDate || null,
      message: data.message || null,
      status: data.status || 'pending',
      adminNotes: data.adminNotes || null,
      createdAt: toDate(data.createdAt),
    };
  }

  async updateConsultationStatus(id: string, status: string, notes?: string): Promise<ConsultationSubmission | undefined> {
    const docRef = this.db.collection('consultationSubmissions').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return undefined;
    
    await docRef.update({
      status,
      adminNotes: notes || null,
    });
    
    const updated = await docRef.get();
    const data = updated.data()!;
    return {
      id: updated.id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      organization: data.organization || null,
      consultationType: data.consultationType || null,
      preferredDate: data.preferredDate || null,
      message: data.message || null,
      status: data.status || 'pending',
      adminNotes: data.adminNotes || null,
      createdAt: toDate(data.createdAt),
    };
  }

  async getAdvisorySessionSubmissions(): Promise<AdvisorySessionSubmission[]> {
    const snapshot = await this.db.collection('advisorySessionSubmissions')
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        organization: data.organization || null,
        sessionTopic: data.sessionTopic || null,
        preferredDate: data.preferredDate || null,
        message: data.message || null,
        status: data.status || 'pending',
        adminNotes: data.adminNotes || null,
        createdAt: toDate(data.createdAt),
      };
    });
  }

  async createAdvisorySessionSubmission(submission: InsertAdvisorySession): Promise<AdvisorySessionSubmission> {
    const id = generateId();
    const now = firestoreTimestamp();
    const setData = sanitizeForFirestore({
      ...submission,
      status: 'pending',
      adminNotes: null,
      createdAt: now,
    });
    await this.db.collection('advisorySessionSubmissions').doc(id).set(setData);
    const doc = await this.db.collection('advisorySessionSubmissions').doc(id).get();
    const data = doc.data()!;
    return {
      id: doc.id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      organization: data.organization || null,
      sessionTopic: data.sessionTopic || null,
      preferredDate: data.preferredDate || null,
      message: data.message || null,
      status: data.status || 'pending',
      adminNotes: data.adminNotes || null,
      createdAt: toDate(data.createdAt),
    };
  }

  async updateAdvisorySessionStatus(id: string, status: string, notes?: string): Promise<AdvisorySessionSubmission | undefined> {
    const docRef = this.db.collection('advisorySessionSubmissions').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return undefined;
    
    await docRef.update({
      status,
      adminNotes: notes || null,
    });
    
    const updated = await docRef.get();
    const data = updated.data()!;
    return {
      id: updated.id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      organization: data.organization || null,
      sessionTopic: data.sessionTopic || null,
      preferredDate: data.preferredDate || null,
      message: data.message || null,
      status: data.status || 'pending',
      adminNotes: data.adminNotes || null,
      createdAt: toDate(data.createdAt),
    };
  }

  async getCampusInviteSubmissions(): Promise<CampusInviteSubmission[]> {
    const snapshot = await this.db.collection('campusInviteSubmissions')
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        institution: data.institution,
        designation: data.designation || null,
        eventType: data.eventType || null,
        preferredDate: data.preferredDate || null,
        expectedAttendees: data.expectedAttendees || null,
        message: data.message || null,
        status: data.status || 'pending',
        adminNotes: data.adminNotes || null,
        createdAt: toDate(data.createdAt),
      };
    });
  }

  async createCampusInviteSubmission(submission: InsertCampusInvite): Promise<CampusInviteSubmission> {
    const id = generateId();
    const now = firestoreTimestamp();
    const setData = sanitizeForFirestore({
      ...submission,
      status: 'pending',
      adminNotes: null,
      createdAt: now,
    });
    await this.db.collection('campusInviteSubmissions').doc(id).set(setData);
    const doc = await this.db.collection('campusInviteSubmissions').doc(id).get();
    const data = doc.data()!;
    return {
      id: doc.id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      institution: data.institution,
      designation: data.designation || null,
      eventType: data.eventType || null,
      preferredDate: data.preferredDate || null,
      expectedAttendees: data.expectedAttendees || null,
      message: data.message || null,
      status: data.status || 'pending',
      adminNotes: data.adminNotes || null,
      createdAt: toDate(data.createdAt),
    };
  }

  async updateCampusInviteStatus(id: string, status: string, notes?: string): Promise<CampusInviteSubmission | undefined> {
    const docRef = this.db.collection('campusInviteSubmissions').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return undefined;
    
    await docRef.update({
      status,
      adminNotes: notes || null,
    });
    
    const updated = await docRef.get();
    const data = updated.data()!;
    return {
      id: updated.id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      institution: data.institution,
      designation: data.designation || null,
      eventType: data.eventType || null,
      preferredDate: data.preferredDate || null,
      expectedAttendees: data.expectedAttendees || null,
      message: data.message || null,
      status: data.status || 'pending',
      adminNotes: data.adminNotes || null,
      createdAt: toDate(data.createdAt),
    };
  }

  async getContactSubmissions(category?: string): Promise<ContactSubmission[]> {
    let query: admin.firestore.Query = this.db.collection('contactSubmissions');
    
    if (category) {
      query = query.where('category', '==', category);
    }
    
    const snapshot = await query.orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || null,
        category: data.category,
        subject: data.subject || null,
        message: data.message,
        status: data.status || 'pending',
        adminNotes: data.adminNotes || null,
        createdAt: toDate(data.createdAt),
      };
    });
  }

  async createContactSubmission(submission: InsertContact): Promise<ContactSubmission> {
    const id = generateId();
    const now = firestoreTimestamp();
    const setData = sanitizeForFirestore({
      ...submission,
      status: 'pending',
      adminNotes: null,
      createdAt: now,
    });
    await this.db.collection('contactSubmissions').doc(id).set(setData);
    const doc = await this.db.collection('contactSubmissions').doc(id).get();
    const data = doc.data()!;
    return {
      id: doc.id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || null,
      category: data.category,
      subject: data.subject || null,
      message: data.message,
      status: data.status || 'pending',
      adminNotes: data.adminNotes || null,
      createdAt: toDate(data.createdAt),
    };
  }

  async updateContactStatus(id: string, status: string, notes?: string): Promise<ContactSubmission | undefined> {
    const docRef = this.db.collection('contactSubmissions').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return undefined;
    
    await docRef.update({
      status,
      adminNotes: notes || null,
    });
    
    const updated = await docRef.get();
    const data = updated.data()!;
    return {
      id: updated.id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || null,
      category: data.category,
      subject: data.subject || null,
      message: data.message,
      status: data.status || 'pending',
      adminNotes: data.adminNotes || null,
      createdAt: toDate(data.createdAt),
    };
  }

  async createEmailReply(reply: InsertEmailReply): Promise<EmailReply> {
    const id = generateId();
    const now = firestoreTimestamp();
    const setData = sanitizeForFirestore({
      ...reply,
      sentAt: now,
    });
    await this.db.collection('emailReplies').doc(id).set(setData);
    const doc = await this.db.collection('emailReplies').doc(id).get();
    const data = doc.data()!;
    return {
      id: doc.id,
      submissionId: data.submissionId,
      submissionType: data.submissionType,
      recipientEmail: data.recipientEmail,
      subject: data.subject,
      body: data.body,
      sentBy: data.sentBy,
      sentAt: toDate(data.sentAt),
    };
  }

  async getEmailReplies(submissionId: string, submissionType: string): Promise<EmailReply[]> {
    const snapshot = await this.db.collection('emailReplies')
      .where('submissionId', '==', submissionId)
      .orderBy('sentAt', 'desc')
      .get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        submissionId: data.submissionId,
        submissionType: data.submissionType,
        recipientEmail: data.recipientEmail,
        subject: data.subject,
        body: data.body,
        sentBy: data.sentBy,
        sentAt: toDate(data.sentAt),
      };
    });
  }
}
