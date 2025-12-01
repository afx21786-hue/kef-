import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMembershipApplicationSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/membership/apply", async (req, res) => {
    try {
      const parsed = insertMembershipApplicationSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: parsed.error.errors 
        });
      }

      const existingApplication = await storage.getMembershipApplicationByEmail(parsed.data.email);
      if (existingApplication) {
        return res.status(409).json({ 
          error: "An application with this email already exists" 
        });
      }

      const application = await storage.createMembershipApplication(parsed.data);
      
      return res.status(201).json({ 
        success: true, 
        message: "Application submitted successfully",
        applicationId: application.id 
      });
    } catch (error) {
      console.error("Error creating membership application:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/membership/applications", async (req, res) => {
    try {
      const applications = await storage.getMembershipApplications();
      const serialized = applications.map(app => ({
        ...app,
        createdAt: app.createdAt?.toISOString() || null
      }));
      return res.json(serialized);
    } catch (error) {
      console.error("Error fetching membership applications:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return httpServer;
}
