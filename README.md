# Full-Stack E-Commerce Platform

A complete full-stack e-commerce application built with React, Express, PostgreSQL, and Docker.

## Technologies Used

- **Frontend:** React 18, Vite, Tailwind CSS, Zustand, React Router DOM, Axios
- **Backend:** Node.js, Express, TypeScript, Prisma ORM, Passport.js (Google OAuth), JWT, Multer
- **Database:** PostgreSQL
- **Testing:** Jest, Supertest, React Testing Library, Mock Service Worker (MSW)
- **DevOps:** Docker, Docker Compose

## Project URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api
- **Database:** PostgreSQL on port 5432

## Test Account Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Customer | customer@example.com | customer123 |

## How to Run

### Option 1: Docker (Recommended)

```bash
# Clone and navigate to project
cd ecommerce-platform

# Start all services
docker-compose up --build

# Access the app at http://localhost:5173