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
docker-compose up --build


# 1. Create uploads directory
mkdir -p uploads

# 2. Copy env files
cp .env.example backend/.env
cp .env.example frontend/.env

# 3. Install backend dependencies
cd backend && npm install

# 4. Generate Prisma client
npx prisma generate

# 5. Run migrations
npx prisma migrate dev --name init

# 6. Seed database
npx prisma db seed

# 7. Install frontend dependencies
cd ../frontend && npm install

# 8. Run tests (backend)
cd ../backend && npm test

# 9. Run tests (frontend)
cd ../frontend && npm test

# 10. Start with Docker (optional)
cd ..
docker-compose up --build