# ⚙️ URL Shortener --- Backend API

A production-oriented REST API powering a full-stack URL management
platform. The backend handles authentication, authorization, URL
management, premium feature gating, analytics, visitor tracking,
validation, rate limiting, and PostgreSQL persistence.

## ✨ Features

### URL Management

-   Create shortened URLs
-   Generate unique short codes
-   Redirect short URLs to original destinations
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
-   Analytics data for dashboard visualization

### Authentication & Authorization

-   User registration
-   JWT authentication
-   Protected routes
-   User-specific resource access
-   Authorization checks
-   Forgot-password functionality
-   Logout/session handling
-   Premium account support
-   Premium feature authorization

### Validation & Reliability

-   Server-side validation
-   Global error handler
-   Global async error handling
-   Graceful API error responses
-   Endpoint-specific rate limiting
-   Duplicate-submission/request protection where appropriate
-   Expired-link handling

### Security

-   JWT-based authentication
-   Authorization checks
-   Prisma ORM
-   Parameterized database operations
-   Environment-based secrets
-   Production HTTPS
-   Endpoint-specific rate limiting

------------------------------------------------------------------------

## 🧰 Tech Stack

-   Node.js
-   Express
-   Prisma ORM
-   PostgreSQL
-   Neon PostgreSQL
-   JWT
-   REST API

> Add or remove exact dependencies according to the packages actually
> present in this repository.

------------------------------------------------------------------------

## 🏗️ Architecture

The backend is a REST API consumed by the separately deployed frontend.

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
│ Authorization             │
│ URL Management            │
│ Analytics                 │
│ Validation                │
│ Rate Limiting             │
│ Error Handling            │
└────────────┬─────────────┘
             │
             │ Prisma
             ▼
┌──────────────────────────┐
│     PostgreSQL / Neon    │
└──────────────────────────┘
```

------------------------------------------------------------------------

## 🔗 URL Shortening Flow

``` text
Client submits long URL
          │
          ▼
Server-side validation
          │
          ▼
Authentication / authorization
          │
          ▼
Premium feature checks
          │
          ├── Custom alias
          ├── Expiration
          └── Password protection
          │
          ▼
Prisma database operation
          │
          ▼
Short URL returned to client
          │
          ▼
Short URL request
          │
          ▼
Lookup + validation
          │
          ▼
Analytics recorded
          │
          ▼
Redirect to destination
```

------------------------------------------------------------------------

## 🔐 Authentication & Authorization

The API uses JWT-based authentication.

Protected endpoints verify the authenticated user's identity before
allowing access to protected resources.

Authorization checks ensure users cannot access or modify resources
belonging to other users.

Premium-only functionality is also enforced on the backend rather than
relying solely on frontend visibility.

------------------------------------------------------------------------

## 🛡️ Security

### Server-Side Validation

User input is validated on the backend before database operations or
business logic are executed.

### SQL Injection Protection

Database operations use Prisma's standard query APIs and parameterized
operations for normal CRUD/database interactions.

### Rate Limiting

Rate limits are configured independently for different API endpoints
according to their expected usage and risk profile.

### Environment Variables

Sensitive configuration is kept outside the source code.

Example:

``` env
DATABASE_URL="YOUR_DATABASE_URL"
JWT_SECRET="YOUR_JWT_SECRET"
```

Never commit real credentials or `.env` files containing secrets.

------------------------------------------------------------------------

## 🗄️ Database

The backend uses **PostgreSQL hosted on Neon** and accesses the database
through **Prisma ORM**.

Prisma provides:

-   Schema management
-   Type-safe database access
-   Database migrations
-   Parameterized query operations
-   Relationship handling
-   Consistent CRUD operations

The production application uses the configured Neon PostgreSQL database.

------------------------------------------------------------------------

## 📊 Analytics

The backend records data required by the frontend analytics system,
including:

-   Total clicks
-   Individual click history
-   Timestamps
-   Last-accessed information
-   Referrer information
-   Device/browser information
-   Per-link analytics

This data powers both the analytics overview and detailed visitor-log
views.

------------------------------------------------------------------------

## ⭐ Premium Feature Gating

Premium functionality is enforced at the backend level.

For example, custom aliases are available to Premium users and their
availability is checked before creating a link.

This prevents users from bypassing frontend restrictions by calling the
API directly.

------------------------------------------------------------------------

## ⚠️ Error Handling

The backend uses centralized error handling and async error handling.

Examples of handled conditions include:

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

The API returns structured error responses that the frontend displays
through its custom notification system.

------------------------------------------------------------------------

## 📄 API Areas

The API is organized around the application's core domains.

Typical areas include:

``` text
Authentication
├── Register
├── Login
├── Forgot password
└── Protected user/session operations

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

Update this section with the exact route names/endpoints used in the
repository if you want a complete API reference.

------------------------------------------------------------------------

## 🚀 Local Development

### 1. Clone the repository

``` bash
git clone YOUR_BACKEND_REPOSITORY_URL
cd YOUR_BACKEND_DIRECTORY
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Create the required `.env` file.

Example:

``` env
DATABASE_URL="YOUR_NEON_DATABASE_URL"
JWT_SECRET="YOUR_JWT_SECRET"
```

Add any other variables required by the application.

### 4. Generate Prisma Client

``` bash
npx prisma generate
```

### 5. Run database migrations

``` bash
npx prisma migrate dev
```

### 6. Start the development server

``` bash
npm run dev
```

Use the scripts defined in `package.json` if the repository uses
different commands.

------------------------------------------------------------------------

## 🌐 Deployment

The backend is deployed on **Render** and uses **Neon PostgreSQL** for
production data.

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

The backend is configured to support environment-specific URLs so
development and production can use the same database model while
generating the appropriate public backend URL for each environment.

------------------------------------------------------------------------

## 🧪 Testing & Verification

Important flows to verify during development include:

-   Registration
-   Login
-   JWT-protected requests
-   Unauthorized access
-   URL creation
-   Duplicate URL handling
-   Custom alias validation
-   Premium authorization
-   URL expiration
-   Password-protected links
-   Redirect behavior
-   Click tracking
-   Analytics
-   Pagination
-   Search
-   Update/delete operations
-   Rate limits
-   Database failures
-   Global error handling

------------------------------------------------------------------------

## 📈 Production Considerations

The backend includes several production-oriented practices:

-   HTTPS in production
-   Environment variables for secrets
-   Centralized error handling
-   Server-side validation
-   JWT authentication
-   Authorization checks
-   Endpoint-specific rate limiting
-   Prisma ORM
-   Production PostgreSQL
-   Pagination for scalable URL listings

------------------------------------------------------------------------

## 🔮 Future Improvements

Potential future enhancements include:

-   Geographic analytics
-   Link preview metadata
-   Custom domain support
-   Additional analytics dimensions
-   Further abuse-prevention mechanisms

------------------------------------------------------------------------

## 📄 License

Add the project's preferred license here if the repository is intended
for public distribution.
