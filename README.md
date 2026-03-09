# DevHire — Scalable Job Portal Backend

## Overview

DevHire is a **production-style backend system for a job portal**, designed to simulate real-world backend architecture used in platforms like LinkedIn or Naukri.

The system supports **role-based workflows, asynchronous processing, and scalable infrastructure**.

Key backend concepts demonstrated:

- Authentication & Authorization
- Relational database design
- Asynchronous job queues
- Background workers
- Secure API architecture
- Containerized deployment

---

## Tech Stack

### Backend

- Node.js
- TypeScript
- Express

### Database

- PostgreSQL
- Prisma ORM

### Caching & Queues

- Redis
- BullMQ

### Email

- Nodemailer

### DevOps

- Docker
- Docker Compose

---

### Asynchronous Email Notifications

When users apply to jobs:

```
Application created
      ↓
Email job pushed to Redis queue
      ↓
Worker processes queue
      ↓
Email sent asynchronously
```

This ensures **non-blocking API responses**.

---

## Running the Project

### Clone Repository

```bash
git clone https://github.com/Dikshantw/devhire-backend.git
cd devhire-backend
```

---

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/devhire
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
```

---

## Example API Routes

### Authentication

```
POST /api/users/register
POST /api/users/login
```

### Jobs

```
GET /api/jobs
POST /api/jobs
```

### Applications

```
POST /api/applications/apply/:jobId
GET /api/applications/job/:jobId
PATCH /api/applications/:applicationId/status
```

---
