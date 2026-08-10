# ⚙️ URL Shortener --- Backend API

A production-oriented REST API for a full-stack URL management platform.
The backend handles authentication, authorization, URL management,
Premium feature gating, analytics, visitor tracking, validation, rate
limiting, and PostgreSQL persistence.

## ✨ Features

### URL Management

-   Create shortened URLs
-   Unique short-code generation
-   Short URL redirects
-   Custom aliases for Premium users
-   Custom-alias availability checking
-   Search
-   Pagination
-   Update destination URLs
-   Delete URLs
-   Duplicate URL handling
-   Configurable expiration
-   Password-protected URLs
-   QR-code generation

### Analytics & Tracking

-   Click counting
-   Click history
-   Creation timestamps
-   Last-accessed timestamps
-   Referrer tracking
-   Device/browser information
-   Visitor logs
-   Per-link analytics

### Authentication & Authorization

-   User registration
-   JWT authentication
-   Protected routes
-   User-specific resource access
-   Authorization checks
-   Forgot-password functionality
-   Logout
-   Premium account support
-   Premium feature authorization

### Validation & Reliability

-   Server-side validation
-   Global error handling
-   Global async error handling
-   Graceful API error responses
-   Endpoint-specific rate limiting
-   Expired-link handling

## 🧰 Tech Stack

-   Node.js
-   Express
-   Prisma ORM
-   PostgreSQL
-   Neon PostgreSQL
-   JWT
-   REST API

## 🏗️ Architecture

``` text
┌──────────────────────────┐
│       React Frontend     │
│      Deployed on Vercel  │
└────────────┬─────────────┘
             │
             │ HTTPS / REST API
             ▼
┌──────────────────────────┐
│       Express API        │
│      Deployed on Render  │
│                          │
│ Authentication           │
│ Authorization            │
│ URL Management           │
│ Analytics                │
│ Validation               │
│ Rate Limiting            │
│ Error Handling           │
└────────────┬─────────────┘
             │
             │ Prisma
             ▼
┌──────────────────────────┐
│     PostgreSQL / Neon    │
└──────────────────────────┘
```

## 🔐 Authentication & Authorization

The API uses JWT-based authentication.

Protected endpoints verify the authenticated user's identity before
allowing access to protected resources.

Authorization checks ensure users cannot access or modify resources
belonging to other users.

Premium-only functionality is enforced on the backend rather than
relying only on frontend restrictions.

## 🛡️ Security

### Server-Side Validation

User input is validated on the backend before processing or database
operations.

### SQL Injection Protection

Database access uses Prisma's standard query APIs and parameterized
database operations for normal CRUD operations.

### Rate Limiting

Different API endpoints use different rate limits according to their
expected usage and risk profile.

### Environment Variables

Sensitive configuration such as database credentials and JWT secrets is
stored in environment variables rather than source code.

## 🗄️ Database

The application uses **PostgreSQL hosted on Neon** and accesses it
through **Prisma ORM**.

Prisma provides:

-   Schema management
-   Database migrations
-   Type-safe database access
-   Parameterized database operations
-   Relationship handling
-   CRUD operations

## 📊 Analytics

The backend records the data required by the analytics system,
including:

-   Total clicks
-   Individual click history
-   Timestamps
-   Last-accessed information
-   Referrer information
-   Device/browser information
-   Per-link analytics

This data powers the analytics overview and detailed visitor logs.

## ⭐ Premium Feature Gating

Premium functionality is enforced at the backend level.

Custom aliases, for example, are available only to Premium users. The
backend verifies account privileges before allowing Premium operations.

## ⚠️ Error Handling

Centralized error handling and async error handling provide consistent
API responses.

Handled conditions include:

-   Invalid input
-   Invalid URLs
-   Authentication failures
-   Authorization failures
-   Missing resources
-   Duplicate aliases
-   Expired links
-   Rate-limit violations
-   Database failures
-   Unexpected server errors

## 📄 API Areas

The API covers the application's main domains:

``` text
Authentication
├── Register
├── Login
├── Forgot password
└── Protected user operations

URLs
├── Create
├── Read
├── Update
├── Delete
├── Search
└── Pagination

Short Links
├── Redirect
├── Expiration validation
└── Password validation

Analytics
├── Click counts
├── Click history
└── Visitor information

Premium
└── Feature authorization
```

## 🚀 Local Development

### Install dependencies

``` bash
npm install
```

### Configure environment variables

Create the required `.env` file with your database connection and JWT
configuration.

Example:

``` env
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
```

Never commit real secrets to source control.

### Generate Prisma Client

``` bash
npx prisma generate
```

### Run migrations

``` bash
npx prisma migrate dev
```

### Start the server

``` bash
npm run dev
```

## 🌐 Deployment

The backend is deployed on **Render** and uses **Neon PostgreSQL**.

``` text
Frontend
   │
   │ HTTPS
   ▼
Render Backend
   │
   │ Prisma
   ▼
Neon PostgreSQL
```

Production communication uses HTTPS.

The application uses environment-specific configuration so development
and production can generate the appropriate backend URL while using the
same database structure.

## 📈 Production Practices

-   JWT authentication
-   Authorization checks
-   Server-side validation
-   Endpoint-specific rate limiting
-   Centralized error handling
-   Environment variables for secrets
-   Prisma ORM
-   PostgreSQL
-   Pagination
-   HTTPS in production

## 📄 License

This project is a portfolio project.
