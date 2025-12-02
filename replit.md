# Kerala Economic Forum (KEF) Website

## Overview

Kerala Economic Forum (KEF) is a non-profit organization website built to empower entrepreneurs, startups, students, and innovators across Kerala. The platform serves as a hub for startup support, networking events, campus initiatives, and business advisory services. The website features a modern, premium design inspired by contemporary startup aesthetics (Stripe, Linear, Notion) with Kerala cultural elements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool

**Routing**: wouter for lightweight client-side routing

**State Management**: 
- React Context API for global state (Theme, Authentication)
- TanStack React Query for server state and data fetching

**UI Components**: 
- shadcn/ui component library (Radix UI primitives)
- Tailwind CSS for styling with custom design tokens
- Custom animation hooks for scroll-based animations and count-up effects

**Design System**:
- Glassmorphism and neumorphism visual effects
- Custom color palette based on KEF brand colors (red, blue, yellow, charcoal)
- Responsive design with mobile-first approach
- Generous border radius (12-24px) and soft shadows for premium feel
- Gradient strokes and wave transitions between sections

**Key Pages**:
- Home (with multiple component sections: Hero, Welcome, Programs, Impact, Events, Testimonials, Partners, Newsletter)
- About, Programs, Startup Support, Campus Initiatives, Events, Membership, Contact
- Dashboard (authenticated users)

### Backend Architecture

**Server Framework**: Express.js running on Node.js

**Build Process**: 
- esbuild for server bundling with selective dependency bundling for cold start optimization
- Vite for client-side builds
- Development mode includes HMR (Hot Module Replacement) via Vite middleware

**API Structure**: 
- RESTful API routes prefixed with `/api`
- Separation of concerns with dedicated routes file (`server/routes.ts`)
- Storage abstraction layer (`server/storage.ts`) supporting in-memory storage with interface for future database implementations

**Session Management**: Prepared for session-based authentication (connect-pg-simple for PostgreSQL sessions)

### Data Storage Solutions

**Database ORM**: Drizzle ORM configured for PostgreSQL

**Schema Design**:
- Users table with UUID primary keys
- Username/password authentication fields
- Schema validation using drizzle-zod

**Current State**: 
- In-memory storage implementation (`MemStorage`) for development
- Database schema defined and ready for PostgreSQL migration
- Drizzle Kit configured for schema migrations

**Note**: The application uses Drizzle ORM without a provisioned database currently. PostgreSQL can be added when needed using the existing schema and configuration.

### Authentication and Authorization

**Primary Authentication**: Firebase Authentication

**Supported Methods**:
- Email/password authentication
- Google OAuth sign-in
- Graceful degradation when Firebase is not configured

**Implementation Pattern**:
- AuthContext provides global authentication state
- Protected routes check authentication status
- Auth modal component for sign-in/sign-up flows
- Token-based session management via Firebase

**Fallback**: Local username/password schema exists in database for potential alternative authentication

### External Dependencies

**Third-Party Services**:
- **Firebase**: Authentication (email/password + Google OAuth) and Firestore database
- **Neon Database**: PostgreSQL serverless database (configured but not provisioned)

### Firestore Integration

The application includes a comprehensive Firestore integration in `client/src/lib/firebase.ts`:

**Helper Functions**:
- `addDocument(collectionName, data)` - Add a new document with auto-generated ID
- `setDocument(collectionName, docId, data, merge?)` - Set/create document with specific ID
- `getDocument(collectionName, docId)` - Get a single document
- `getDocuments(collectionName, ...queryConstraints)` - Query multiple documents
- `updateDocument(collectionName, docId, data)` - Update existing document
- `deleteDocument(collectionName, docId)` - Delete a document

**Real-time Subscriptions**:
- `subscribeToCollection(collectionName, callback, ...queryConstraints)` - Subscribe to collection changes
- `subscribeToDocument(collectionName, docId, callback)` - Subscribe to document changes

**Query Utilities** (re-exported for use in components):
- `where`, `orderBy`, `limit` - Firestore query constraints

**Notes**:
- All helper functions automatically add `createdAt` or `updatedAt` timestamps via `serverTimestamp()`
- Functions gracefully handle missing Firebase configuration and return appropriate error messages
- Subscription functions return unsubscribe handlers for cleanup in useEffect

**Key Libraries**:
- **UI Components**: @radix-ui primitives (accordion, dialog, dropdown, navigation, etc.)
- **Forms**: react-hook-form with @hookform/resolvers for validation
- **Validation**: zod and drizzle-zod for schema validation
- **Date Handling**: date-fns for date formatting and manipulation
- **Styling**: Tailwind CSS with class-variance-authority for variant management
- **Icons**: lucide-react icon library
- **Animations**: Framer Motion for complex animations
- **Carousels**: embla-carousel-react for image/content carousels

**Development Tools**:
- TypeScript for type safety
- ESBuild for fast server bundling
- Vite plugins for Replit integration (cartographer, dev-banner, runtime-error-modal)
- PostCSS with Autoprefixer for CSS processing

**Build Configuration**:
- Path aliases configured for clean imports (@, @shared, @assets)
- Selective server dependency bundling for performance
- Separate client and server build outputs