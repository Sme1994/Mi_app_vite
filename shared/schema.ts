import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tickets = pgTable("tickets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ticketNumber: text("ticket_number").notNull().unique(),
  licensePlate: text("license_plate").notNull(),
  vehicleMake: text("vehicle_make"),
  vehicleModel: text("vehicle_model"),
  vehicleYear: text("vehicle_year"),
  vehicleColor: text("vehicle_color"),
  mileage: text("mileage"),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email"),
  emergencyContact: text("emergency_contact"),
  serviceDescription: text("service_description"),
  status: text("status").notNull().default("registered"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertTicketSchema = createInsertSchema(tickets).omit({
  id: true,
  ticketNumber: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  vehicleMake: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleYear: z.string().optional(),
  vehicleColor: z.string().optional(),
  mileage: z.string().optional(),
  customerEmail: z.string().optional(),
  emergencyContact: z.string().optional(),
  serviceDescription: z.string().optional(),
});

export const updateTicketStatusSchema = z.object({
  status: z.enum(["registered", "diagnosis", "repair", "quality", "ready"]),
});

export type InsertTicket = z.infer<typeof insertTicketSchema>;
export type Ticket = typeof tickets.$inferSelect;
export type TicketStatus = "registered" | "diagnosis" | "repair" | "quality" | "ready";
