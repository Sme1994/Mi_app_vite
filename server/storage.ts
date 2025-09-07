import { type Ticket, type InsertTicket, type TicketStatus } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Ticket operations
  getTicket(id: string): Promise<Ticket | undefined>;
  getTicketByNumber(ticketNumber: string): Promise<Ticket | undefined>;
  getTicketByLicensePlate(licensePlate: string): Promise<Ticket | undefined>;
  getAllTickets(): Promise<Ticket[]>;
  getActiveTickets(): Promise<Ticket[]>;
  createTicket(ticket: InsertTicket): Promise<Ticket>;
  updateTicketStatus(id: string, status: TicketStatus): Promise<Ticket | undefined>;
  searchTickets(query: string): Promise<Ticket[]>;
  getTicketStats(): Promise<{
    registered: number;
    diagnosis: number;
    repair: number;
    quality: number;
    ready: number;
  }>;
}

export class MemStorage implements IStorage {
  private tickets: Map<string, Ticket>;
  private ticketCounter: number;

  constructor() {
    this.tickets = new Map();
    this.ticketCounter = 1;
  }

  private generateTicketNumber(): string {
    const number = this.ticketCounter.toString().padStart(3, '0');
    this.ticketCounter++;
    return `T${number}`;
  }

  async getTicket(id: string): Promise<Ticket | undefined> {
    return this.tickets.get(id);
  }

  async getTicketByNumber(ticketNumber: string): Promise<Ticket | undefined> {
    return Array.from(this.tickets.values()).find(
      (ticket) => ticket.ticketNumber === ticketNumber
    );
  }

  async getTicketByLicensePlate(licensePlate: string): Promise<Ticket | undefined> {
    return Array.from(this.tickets.values()).find(
      (ticket) => ticket.licensePlate.toLowerCase() === licensePlate.toLowerCase()
    );
  }

  async getAllTickets(): Promise<Ticket[]> {
    return Array.from(this.tickets.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getActiveTickets(): Promise<Ticket[]> {
    return Array.from(this.tickets.values())
      .filter(ticket => ticket.status !== "ready")
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async createTicket(insertTicket: InsertTicket): Promise<Ticket> {
    const id = randomUUID();
    const now = new Date();
    const ticket: Ticket = {
      ...insertTicket,
      id,
      ticketNumber: this.generateTicketNumber(),
      vehicleMake: insertTicket.vehicleMake || null,
      vehicleModel: insertTicket.vehicleModel || null,
      vehicleYear: insertTicket.vehicleYear || null,
      vehicleColor: insertTicket.vehicleColor || null,
      mileage: insertTicket.mileage || null,
      customerEmail: insertTicket.customerEmail || null,
      emergencyContact: insertTicket.emergencyContact || null,
      serviceDescription: insertTicket.serviceDescription || null,
      status: insertTicket.status || "registered",
      createdAt: now,
      updatedAt: now,
    };
    this.tickets.set(id, ticket);
    return ticket;
  }

  async updateTicketStatus(id: string, status: TicketStatus): Promise<Ticket | undefined> {
    const ticket = this.tickets.get(id);
    if (!ticket) return undefined;

    const updatedTicket: Ticket = {
      ...ticket,
      status,
      updatedAt: new Date(),
    };
    
    this.tickets.set(id, updatedTicket);
    return updatedTicket;
  }

  async searchTickets(query: string): Promise<Ticket[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.tickets.values()).filter(
      (ticket) =>
        ticket.ticketNumber.toLowerCase().includes(lowerQuery) ||
        ticket.licensePlate.toLowerCase().includes(lowerQuery) ||
        ticket.customerName.toLowerCase().includes(lowerQuery)
    );
  }

  async getTicketStats(): Promise<{
    registered: number;
    diagnosis: number;
    repair: number;
    quality: number;
    ready: number;
  }> {
    const tickets = Array.from(this.tickets.values());
    return {
      registered: tickets.filter(t => t.status === "registered").length,
      diagnosis: tickets.filter(t => t.status === "diagnosis").length,
      repair: tickets.filter(t => t.status === "repair").length,
      quality: tickets.filter(t => t.status === "quality").length,
      ready: tickets.filter(t => t.status === "ready").length,
    };
  }
}

export const storage = new MemStorage();
