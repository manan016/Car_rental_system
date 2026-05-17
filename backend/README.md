# Veloce CRMS — Enterprise Backend Architecture

![Architecture](https://img.shields.io/badge/Architecture-Microservices_Ready-25D366?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-Node.js_|_Express_|_MySQL-118AB2?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-JWT_|_AES--256-EF476F?style=for-the-badge)

Welcome to the backend repository for the **Veloce Car Rental Management System (CRMS)**. This backend is engineered with 20 years of enterprise software development experience, focusing on scalability, security, and maintainability.

## 🏗️ Architectural Philosophy

The backend follows a **Layered (N-Tier) Architecture** with a strong emphasis on the **Service-Repository Pattern**. This ensures strict separation of concerns, making the codebase highly testable and agnostic to underlying framework changes.

1.  **Presentation Layer (Routes/Controllers):** Handles HTTP requests, input validation, and response formatting.
2.  **Business Logic Layer (Services):** Contains the core business rules. Completely independent of HTTP.
3.  **Data Access Layer (Repositories):** Abstracts the database interactions (MySQL/Prisma ORM).

## 🛠️ Technology Stack

*   **Runtime:** Node.js (v20 LTS)
*   **Framework:** Express.js (with async-handler wrapper)
*   **Language:** TypeScript (Strict Mode)
*   **Database:** MySQL 8.0 (Relational Data, 3NF Normalized)
*   **ORM / Query Builder:** Prisma (for type-safe database access)
*   **Caching:** Redis (for session management and frequent reads like fleet availability)
*   **Authentication:** JSON Web Tokens (JWT) with HTTP-Only Cookies
*   **Security:** Helmet, CORS, Express-Rate-Limit, Bcrypt (12 Salt Rounds)

## 📁 Professional Directory Structure

```text
backend/
├── src/
│   ├── api/                  # API routing and controllers
│   │   ├── controllers/      # Route handlers (req, res)
│   │   ├── routes/           # Express route definitions
│   │   └── middlewares/      # Custom middlewares (auth, error handling)
│   ├── services/             # Core business logic (CarService, BookingService)
│   ├── repositories/         # Database abstraction layer
│   ├── models/               # TS Interfaces and Prisma schema configurations
│   ├── config/               # Environment variables and system configs
│   ├── utils/                # Helpers (logger, hash, date formatters)
│   └── app.ts                # Express application setup
├── tests/                    # Unit and integration tests (Jest)
├── prisma/                   # Database schema and migrations
├── docker-compose.yml        # Local development environment
├── package.json
└── README.md
```

## 🔒 Enterprise Security Measures

*   **Stateless Authentication:** Stateless JWTs stored in secure, `HttpOnly`, `SameSite=Strict` cookies to prevent XSS attacks.
*   **Password Hashing:** Passwords are never stored in plaintext. `bcrypt` with a cost factor of 12 is utilized.
*   **Rate Limiting:** Global rate limiting via Redis to prevent DDoS and brute-force attacks (e.g., max 5 login attempts per IP per minute).
*   **Data Validation:** Strict payload validation using `Zod` or `Joi` before data reaches the controller layer.
*   **SQL Injection Prevention:** Parameterized queries enforced automatically by the ORM layer.

## 🔌 Core API Specifications (RESTful)

All endpoints follow strict RESTful conventions, utilizing appropriate HTTP verbs and standard status codes.

### 🚗 Fleet Management
*   `GET    /api/v1/fleet` - Retrieve available cars (Supports pagination, filtering, sorting)
*   `GET    /api/v1/fleet/:id` - Get vehicle details
*   `POST   /api/v1/fleet` - [ADMIN] Add a new vehicle
*   `PATCH  /api/v1/fleet/:id/status` - [ADMIN] Update vehicle availability (Maintenance, Active)

### 📅 Booking Engine
*   `POST   /api/v1/bookings` - Create a new booking (Calculates dynamic pricing & checks conflicts)
*   `GET    /api/v1/bookings/me` - Retrieve current user's booking history
*   `PATCH  /api/v1/bookings/:id/approve` - [ADMIN] Approve a pending booking

### 👥 User & Auth
*   `POST   /api/v1/auth/login` - Authenticate user & issue JWT
*   `POST   /api/v1/auth/register` - Create a new customer account
*   `GET    /api/v1/users/me` - Get current user profile

## 🚀 Getting Started (Development)

1.  **Clone & Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Environment Setup:**
    Duplicate `.env.example` to `.env` and configure your MySQL connection string and JWT Secrets.
3.  **Database Migration:**
    ```bash
    npx prisma migrate dev --name init
    ```
4.  **Start Development Server:**
    ```bash
    npm run dev
    ```

## ☁️ Deployment Architecture

The backend is designed to be fully containerized. 
*   **Docker:** A `Dockerfile` provides a lightweight Node Alpine image.
*   **CI/CD:** GitHub Actions pipeline configured for automated testing (Jest) and linting (ESLint) before merging to the `main` branch.
*   **Cloud:** Ready for deployment on AWS ECS (Elastic Container Service) or an EC2 instance behind an NGINX reverse proxy.
