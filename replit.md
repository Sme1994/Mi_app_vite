# AutoService Pro

## Overview

AutoService Pro is a comprehensive automotive service management system designed to streamline vehicle service operations. The application provides a complete workflow for managing service tickets from initial vehicle registration through diagnosis, repair, quality control, and final delivery. Built as a modern full-stack web application, it features a React frontend with TypeScript, an Express.js backend, and PostgreSQL database integration using Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **UI Components**: Shadcn/UI component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API architecture with JSON responses
- **Request Handling**: Express middleware for JSON parsing, URL encoding, and request logging
- **Error Handling**: Centralized error handling middleware
- **Development**: Hot reload with Vite integration in development mode

### Data Storage
- **Database**: PostgreSQL with Neon Database serverless hosting
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Schema Management**: Database migrations handled through Drizzle Kit
- **Development Storage**: In-memory storage fallback for development environments

### Core Data Models
- **Tickets Table**: Comprehensive vehicle service tracking with fields for vehicle information, customer details, service descriptions, and status progression
- **Status Workflow**: Five-stage process (registered → diagnosis → repair → quality → ready)
- **Validation**: Zod schemas for runtime type checking and API validation

### Authentication & Authorization
- Currently implements a basic user display without authentication
- Session management setup present but not fully implemented
- Future-ready for role-based access control

### API Structure
- **GET /api/tickets** - Retrieve all service tickets
- **GET /api/tickets/active** - Get tickets not ready for delivery
- **GET /api/tickets/stats** - Service statistics dashboard data
- **GET /api/tickets/search** - Search tickets by query string
- **POST /api/tickets** - Create new service tickets
- **PATCH /api/tickets/:id/status** - Update ticket status

### User Interface Design
- **Dashboard**: Real-time service statistics with status-based filtering
- **Registration Form**: Comprehensive vehicle and customer information capture
- **Customer Display**: Public-facing service status board
- **Status Management**: Visual workflow indicators with update capabilities

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Database URL**: Environment-based configuration for database connections

### Development Tools
- **Vite**: Frontend build tool with hot module replacement
- **Replit Integration**: Development environment with error overlay and cartographer plugins
- **TypeScript**: Static type checking across frontend and backend

### UI & Styling Libraries
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless component primitives for accessibility
- **Lucide React**: Icon library for consistent iconography
- **Date-fns**: Date manipulation and formatting

### Validation & Forms
- **Zod**: Runtime schema validation
- **React Hook Form**: Form state management and validation
- **Hookform Resolvers**: Integration between React Hook Form and Zod

### Development Dependencies
- **ESBuild**: Fast JavaScript bundler for production builds
- **TSX**: TypeScript execution for development server
- **PostCSS**: CSS processing with Autoprefixer