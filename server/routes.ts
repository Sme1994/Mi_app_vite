import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTicketSchema, updateTicketStatusSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all tickets
  app.get("/api/tickets", async (req, res) => {
    try {
      const tickets = await storage.getAllTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tickets" });
    }
  });

  // Get active tickets (not ready for delivery)
  app.get("/api/tickets/active", async (req, res) => {
    try {
      const tickets = await storage.getActiveTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch active tickets" });
    }
  });

  // Get ticket stats
  app.get("/api/tickets/stats", async (req, res) => {
    try {
      const stats = await storage.getTicketStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ticket stats" });
    }
  });

  // Search tickets
  app.get("/api/tickets/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ message: "Query parameter 'q' is required" });
      }
      const tickets = await storage.searchTickets(q);
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: "Failed to search tickets" });
    }
  });

  // Get single ticket
  app.get("/api/tickets/:id", async (req, res) => {
    try {
      const ticket = await storage.getTicket(req.params.id);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ticket" });
    }
  });

  // Create new ticket
  app.post("/api/tickets", async (req, res) => {
    try {
      const validatedData = insertTicketSchema.parse(req.body);
      
      // Check if license plate already exists
      const existingTicket = await storage.getTicketByLicensePlate(validatedData.licensePlate);
      if (existingTicket) {
        return res.status(400).json({ message: "A ticket for this license plate already exists" });
      }

      const ticket = await storage.createTicket(validatedData);
      res.status(201).json(ticket);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create ticket" });
    }
  });

  // Update ticket status
  app.patch("/api/tickets/:id/status", async (req, res) => {
    try {
      const { status } = updateTicketStatusSchema.parse(req.body);
      const ticket = await storage.updateTicketStatus(req.params.id, status);
      
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      
      res.json(ticket);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid status", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update ticket status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
