# Flipkart Clone

**Live Demo:** [https://scaler-assignment-mu.vercel.app/](https://scaler-assignment-mu.vercel.app/)

---

## Tech Stack

| Layer    | Technology                                                   |
| -------- | ------------------------------------------------------------ |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4, React Router v7 |
| Backend  | Node.js, Express.js, TypeScript                              |
| Database | PostgreSQL (Neon serverless) via Prisma ORM                  |
| Auth     | JWT + bcryptjs                                               |

---

## Features

**Core**

- Product listing page with Flipkart-style grid and card design
- Search by name and filter by category
- Product detail page with image carousel, specs, price, and stock status
- Add to Cart / Buy Now
- Cart with quantity update and item removal
- Multi-step checkout (address → order summary → confirmation)
- Order confirmation page with order ID

**Bonus**

- User authentication (Login / Signup)
- Order history page
- Infinite scroll on the home page
- Responsive design (mobile, tablet, desktop)

---

## Setup Instructions

### Prerequisites

- Node.js ≥ 18
- pnpm
- A PostgreSQL database (e.g. [Neon](https://neon.tech))

### Backend

Create a `.env` file inside `backend/` with:

```
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

Then run:

```bash
cd backend
pnpm install
pnpm db:migrate
pnpm db:seed
pnpm dev               # runs on http://localhost:3000
```

### Frontend

Create a `.env` file inside `frontend/` with:

```
VITE_API_BASE_URL=http://localhost:3000
```

Then run:

```bash
cd frontend
pnpm install
pnpm dev               # runs on http://localhost:5173
```

---

## Test Credentials

| Field    | Value                      |
| -------- | -------------------------- |
| Email    | shivamgupta02005@gmail.com |
| Password | shivam2005                 |
