import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, isAdmin } from "./replitAuth";
import { requireFirebaseAuth, requireFirebaseAdmin } from "./firebaseAdmin";
import { sendEmail, formatReplyEmail } from "./email";
import { 
  insertResourceSchema, insertProgramSchema, insertEventSchema, 
  insertMembershipPlanSchema, insertApplyFormSchema, insertRegisterFormSchema,
  insertConsultationSchema, insertAdvisorySessionSchema, insertCampusInviteSchema,
  insertContactSchema
} from "@shared/schema";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '786954';

const isAdminSession = (req: any, res: any, next: any) => {
  if (req.session && req.session.isAdmin === true) {
    return next();
  }
  return res.status(401).json({ error: "Admin authentication required" });
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await setupAuth(app);

  app.post('/api/admin/login', (req: any, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      req.session.isAdmin = true;
      return res.json({ success: true, message: "Admin access granted" });
    }
    return res.status(401).json({ success: false, message: "Incorrect password" });
  });

  app.post('/api/admin/logout', (req: any, res) => {
    req.session.isAdmin = false;
    return res.json({ success: true, message: "Logged out" });
  });

  app.get('/api/admin/check', (req: any, res) => {
    return res.json({ isAdmin: req.session?.isAdmin === true });
  });

  // Update user role - protected by admin session
  app.patch('/api/admin/users/:id/role', isAdminSession, async (req: any, res) => {
    try {
      const { role } = req.body;
      if (!role || !['admin', 'user'].includes(role)) {
        return res.status(400).json({ error: "Invalid role. Must be 'admin' or 'user'" });
      }
      const user = await storage.updateUserRole(req.params.id, role);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ error: "Failed to update user role" });
    }
  });

  // One-time bootstrap: Make a specific user admin (secured by password)
  app.post('/api/bootstrap/make-admin', async (req: any, res) => {
    try {
      const { userId, password } = req.body;
      if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const user = await storage.updateUserRole(userId, 'admin');
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ success: true, user });
    } catch (error) {
      console.error("Error in bootstrap:", error);
      res.status(500).json({ error: "Failed to make user admin" });
    }
  });

  // Firebase user sync endpoint - secured with Firebase Auth
  app.post('/api/auth/sync', requireFirebaseAuth, async (req: any, res) => {
    try {
      const decodedToken = req.firebaseUser;
      const { displayName, photoURL } = req.body;
      
      // Use the verified UID from the token, not from request body
      const uid = decodedToken.uid;
      const email = decodedToken.email;
      
      if (!uid || !email) {
        return res.status(400).json({ message: "Invalid token: missing uid or email" });
      }

      // Check if this is the first user (they become admin)
      const userCount = await storage.getUserCount();
      const isFirstUser = userCount === 0;
      
      // Parse display name into first and last name
      const nameParts = (displayName || decodedToken.name || '').split(' ');
      const firstName = nameParts[0] || null;
      const lastName = nameParts.slice(1).join(' ') || null;
      
      // Upsert the user - first user becomes admin
      const user = await storage.upsertFirebaseUser({
        id: uid,
        email,
        firstName,
        lastName,
        profileImageUrl: photoURL || decodedToken.picture || null,
        role: isFirstUser ? "admin" : "user",
      });
      
      res.json(user);
    } catch (error) {
      console.error("Error syncing Firebase user:", error);
      res.status(500).json({ message: "Failed to sync user" });
    }
  });

  // Get current Firebase user from database - secured with Firebase Auth
  app.get('/api/auth/firebase-user/:uid', requireFirebaseAuth, async (req: any, res) => {
    try {
      const decodedToken = req.firebaseUser;
      const requestedUid = req.params.uid;
      
      // Only allow users to fetch their own data
      if (decodedToken.uid !== requestedUid) {
        return res.status(403).json({ message: "Forbidden: Cannot access other user's data" });
      }
      
      const user = await storage.getUser(requestedUid);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching Firebase user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get("/api/resources", async (req, res) => {
    try {
      const resources = await storage.getResources();
      const activeResources = resources.filter(r => r.isActive);
      res.json(activeResources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/programs", async (req, res) => {
    try {
      const programs = await storage.getPrograms();
      const activePrograms = programs.filter(p => p.isActive);
      res.json(activePrograms);
    } catch (error) {
      console.error("Error fetching programs:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getEvents();
      const activeEvents = events.filter(e => e.isActive);
      res.json(activeEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/membership-plans", async (req, res) => {
    try {
      const plans = await storage.getMembershipPlans();
      const activePlans = plans.filter(p => p.isActive);
      res.json(activePlans);
    } catch (error) {
      console.error("Error fetching membership plans:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/forms/apply", async (req, res) => {
    try {
      const parsed = insertApplyFormSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error.errors });
      }
      const submission = await storage.createApplyFormSubmission(parsed.data);
      res.status(201).json({ success: true, message: "Application submitted successfully", id: submission.id });
    } catch (error) {
      console.error("Error submitting apply form:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/forms/register", async (req, res) => {
    try {
      const parsed = insertRegisterFormSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error.errors });
      }
      const submission = await storage.createRegisterFormSubmission(parsed.data);
      res.status(201).json({ success: true, message: "Registration submitted successfully", id: submission.id });
    } catch (error) {
      console.error("Error submitting register form:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/forms/consultation", async (req, res) => {
    try {
      const parsed = insertConsultationSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error.errors });
      }
      const submission = await storage.createConsultationSubmission(parsed.data);
      res.status(201).json({ success: true, message: "Consultation request submitted successfully", id: submission.id });
    } catch (error) {
      console.error("Error submitting consultation form:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/forms/advisory", async (req, res) => {
    try {
      const parsed = insertAdvisorySessionSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error.errors });
      }
      const submission = await storage.createAdvisorySessionSubmission(parsed.data);
      res.status(201).json({ success: true, message: "Advisory session request submitted successfully", id: submission.id });
    } catch (error) {
      console.error("Error submitting advisory form:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/forms/campus-invite", async (req, res) => {
    try {
      const parsed = insertCampusInviteSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error.errors });
      }
      const submission = await storage.createCampusInviteSubmission(parsed.data);
      res.status(201).json({ success: true, message: "Campus invite request submitted successfully", id: submission.id });
    } catch (error) {
      console.error("Error submitting campus invite form:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = insertContactSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error.errors });
      }
      const submission = await storage.createContactSubmission(parsed.data);
      res.status(201).json({ success: true, message: "Contact form submitted successfully", id: submission.id });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/forms/apply/all", isAdminSession, async (req, res) => {
    try {
      const submissions = await storage.getApplyFormSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching apply form submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/forms/register/all", isAdminSession, async (req, res) => {
    try {
      const submissions = await storage.getRegisterFormSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching register form submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/forms/consultation/all", isAdminSession, async (req, res) => {
    try {
      const submissions = await storage.getConsultationSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching consultation submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/forms/advisory/all", isAdminSession, async (req, res) => {
    try {
      const submissions = await storage.getAdvisorySessionSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching advisory submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/forms/campus-invite/all", isAdminSession, async (req, res) => {
    try {
      const submissions = await storage.getCampusInviteSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching campus invite submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/contact/all", isAdminSession, async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const submissions = await storage.getContactSubmissions(category);
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/resources", isAdminSession, async (req, res) => {
    try {
      const resources = await storage.getResources();
      res.json(resources);
    } catch (error) {
      console.error("Error fetching admin resources:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/resources", isAdminSession, async (req, res) => {
    try {
      const parsed = insertResourceSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error.errors });
      }
      const resource = await storage.createResource(parsed.data);
      res.status(201).json(resource);
    } catch (error) {
      console.error("Error creating resource:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/admin/resources/:id", isAdminSession, async (req, res) => {
    try {
      const resource = await storage.updateResource(req.params.id, req.body);
      if (!resource) {
        return res.status(404).json({ error: "Resource not found" });
      }
      res.json(resource);
    } catch (error) {
      console.error("Error updating resource:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/resources/:id", isAdminSession, async (req, res) => {
    try {
      await storage.deleteResource(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting resource:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/programs", isAdminSession, async (req, res) => {
    try {
      const programs = await storage.getPrograms();
      res.json(programs);
    } catch (error) {
      console.error("Error fetching admin programs:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/programs", isAdminSession, async (req, res) => {
    try {
      const parsed = insertProgramSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error.errors });
      }
      const program = await storage.createProgram(parsed.data);
      res.status(201).json(program);
    } catch (error) {
      console.error("Error creating program:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/admin/programs/:id", isAdminSession, async (req, res) => {
    try {
      const program = await storage.updateProgram(req.params.id, req.body);
      if (!program) {
        return res.status(404).json({ error: "Program not found" });
      }
      res.json(program);
    } catch (error) {
      console.error("Error updating program:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/programs/:id", isAdminSession, async (req, res) => {
    try {
      await storage.deleteProgram(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting program:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/events", isAdminSession, async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching admin events:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/events", isAdminSession, async (req, res) => {
    try {
      const parsed = insertEventSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error.errors });
      }
      const event = await storage.createEvent(parsed.data);
      res.status(201).json(event);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/admin/events/:id", isAdminSession, async (req, res) => {
    try {
      const event = await storage.updateEvent(req.params.id, req.body);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/events/:id", isAdminSession, async (req, res) => {
    try {
      await storage.deleteEvent(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/membership-plans", isAdminSession, async (req, res) => {
    try {
      const plans = await storage.getMembershipPlans();
      res.json(plans);
    } catch (error) {
      console.error("Error fetching admin membership plans:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/membership-plans", isAdminSession, async (req, res) => {
    try {
      const parsed = insertMembershipPlanSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Validation failed", details: parsed.error.errors });
      }
      const plan = await storage.createMembershipPlan(parsed.data);
      res.status(201).json(plan);
    } catch (error) {
      console.error("Error creating membership plan:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/admin/membership-plans/:id", isAdminSession, async (req, res) => {
    try {
      const plan = await storage.updateMembershipPlan(req.params.id, req.body);
      if (!plan) {
        return res.status(404).json({ error: "Membership plan not found" });
      }
      res.json(plan);
    } catch (error) {
      console.error("Error updating membership plan:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/membership-plans/:id", isAdminSession, async (req, res) => {
    try {
      await storage.deleteMembershipPlan(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting membership plan:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/forms/apply", isAdminSession, async (req, res) => {
    try {
      const submissions = await storage.getApplyFormSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching apply form submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/admin/forms/apply/:id", isAdminSession, async (req, res) => {
    try {
      const { status, adminNotes } = req.body;
      const submission = await storage.updateApplyFormStatus(req.params.id, status, adminNotes);
      res.json(submission);
    } catch (error) {
      console.error("Error updating apply form submission:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/forms/register", isAdminSession, async (req, res) => {
    try {
      const submissions = await storage.getRegisterFormSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching register form submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/admin/forms/register/:id", isAdminSession, async (req, res) => {
    try {
      const { status, adminNotes } = req.body;
      const submission = await storage.updateRegisterFormStatus(req.params.id, status, adminNotes);
      res.json(submission);
    } catch (error) {
      console.error("Error updating register form submission:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/forms/consultation", isAdminSession, async (req, res) => {
    try {
      const submissions = await storage.getConsultationSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching consultation submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/admin/forms/consultation/:id", isAdminSession, async (req, res) => {
    try {
      const { status, adminNotes } = req.body;
      const submission = await storage.updateConsultationStatus(req.params.id, status, adminNotes);
      res.json(submission);
    } catch (error) {
      console.error("Error updating consultation submission:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/forms/advisory", isAdminSession, async (req, res) => {
    try {
      const submissions = await storage.getAdvisorySessionSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching advisory submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/admin/forms/advisory/:id", isAdminSession, async (req, res) => {
    try {
      const { status, adminNotes } = req.body;
      const submission = await storage.updateAdvisorySessionStatus(req.params.id, status, adminNotes);
      res.json(submission);
    } catch (error) {
      console.error("Error updating advisory submission:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/forms/campus-invite", isAdminSession, async (req, res) => {
    try {
      const submissions = await storage.getCampusInviteSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching campus invite submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/admin/forms/campus-invite/:id", isAdminSession, async (req, res) => {
    try {
      const { status, adminNotes } = req.body;
      const submission = await storage.updateCampusInviteStatus(req.params.id, status, adminNotes);
      res.json(submission);
    } catch (error) {
      console.error("Error updating campus invite submission:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/contact", isAdminSession, async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const submissions = await storage.getContactSubmissions(category);
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/admin/contact/:id", isAdminSession, async (req, res) => {
    try {
      const { status, adminNotes } = req.body;
      const submission = await storage.updateContactStatus(req.params.id, status, adminNotes);
      res.json(submission);
    } catch (error) {
      console.error("Error updating contact submission:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/email-reply", isAdminSession, async (req: any, res) => {
    try {
      const { submissionId, submissionType, recipientEmail, subject, body } = req.body;
      const userId = "admin";
      
      // Send the actual email via Resend
      const htmlContent = formatReplyEmail(subject, body);
      const emailResult = await sendEmail({
        to: recipientEmail,
        subject: subject,
        html: htmlContent,
        text: body,
      });

      if (!emailResult.success) {
        console.error("Failed to send email:", emailResult.error);
        // Provide a user-friendly message for common errors
        const errorMessage = emailResult.error?.includes('not connected') 
          ? 'Email service is not configured. Please set up Resend integration to send emails.'
          : `Failed to send email: ${emailResult.error}`;
        return res.status(500).json({ error: errorMessage });
      }
      
      // Store the reply record in the database
      const reply = await storage.createEmailReply({
        submissionId,
        submissionType,
        recipientEmail,
        subject,
        body,
        sentBy: userId,
      });
      
      res.status(201).json({ success: true, message: "Email sent successfully", reply, emailId: emailResult.id });
    } catch (error: any) {
      console.error("Error sending email reply:", error);
      const errorMessage = error?.message?.includes('not connected') || error?.message?.includes('Resend')
        ? 'Email service is not configured. Please set up Resend integration to send emails.'
        : 'Failed to send email. Please try again later.';
      res.status(500).json({ error: errorMessage });
    }
  });

  app.get("/api/admin/email-replies/:submissionId/:submissionType", isAdminSession, async (req, res) => {
    try {
      const replies = await storage.getEmailReplies(req.params.submissionId, req.params.submissionType);
      res.json(replies);
    } catch (error) {
      console.error("Error fetching email replies:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return httpServer;
}
