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
```

## Security & Environment variables

- This repository should never contain real secrets in source control. If you find a committed `.env` with secrets, rotate those secrets immediately and remove the file from the repository history.
- Use the provided `.env.example` as a template. Copy it to `.env` locally and fill in real values before running the project.
- Ensure `.env` is listed in `.gitignore` (already present).

Commands to remove a committed `.env` from history (use with caution):

```bash
# Remove .env from the latest commit and ensure it's ignored
git rm --cached .env
git commit -m "Remove .env from repository"
git push

# For full history removal, consider using the BFG Repo-Cleaner or git filter-repo.
```