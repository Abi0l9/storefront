# Product Listing Web App

Fullstack take-home implementation using Vite, React, TypeScript, Tailwind CSS,
Express, MongoDB, and Mongoose.

## Features

- Username/password login with JWT authentication.
- Product listing with search, category, price filters, and pagination.
- Product detail page.
- Authenticated product create, update, and delete.
- Global cart state with badge, quantity controls, removal, checkout total, and local persistence.
- Optional order creation endpoint used by checkout when logged in.
- First-run seed data for a demo user and products.

## Project Structure

```text
backend/
  src/features/*/*.models.js
  src/features/*/*.schema.js
  src/features/*/*.services.js
  src/features/*/*.controller.js
  src/features/*/*.routes.js
  src/features/*/*.utils.js

frontend/
  Vite React TypeScript app
  Tailwind CSS styling
  Context state and React Router
```

## Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://USER:PASSWORD@HOST/store?retryWrites=true&w=majority
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
SEED_DEFAULTS=true
LOG_LEVEL=info
LOG_TO_FILE=true
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Create `frontend/.env`:

```env
VITE_API_URL=/api
```

## Local Setup

```bash
npm install
npm run install:all
npm run dev
```

Open `http://localhost:5173`.

Demo login created on first backend start:

```text
username: admin
password: password123
```

## API Summary

- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/uploads/products`
- `POST /api/orders`

`POST /api/uploads/products` is authenticated and accepts multipart image files
under the `images` field. It returns Cloudinary URLs that are stored on
products as `imageUrls`.

## Backend Logs

The API writes structured JSON logs to the console and, by default,
`backend/logs/app.log`.

Each request produces:

- `request:start`
- `request:end`
- `request:error` when an exception is handled

Sensitive headers and body fields such as `authorization`, `cookie`,
`password`, and `token` are redacted.

## Deployment To Render

### MongoDB Atlas

1. Create an Atlas cluster and database user.
2. Add the deployment provider IP range or `0.0.0.0/0` for a quick test.
3. Copy the connection string into `MONGO_URI`.

### Render Blueprint

This repository includes `render.yaml` with two Render services:

- `store-backend`: Node/Express web service from `backend/`
- `store-frontend`: static Vite site from `frontend/`

Backend environment variables:

```env
NODE_ENV=production
SEED_DEFAULTS=true
LOG_LEVEL=info
LOG_TO_FILE=false
CLIENT_URL=https://YOUR-FRONTEND.onrender.com
MONGO_URI=mongodb+srv://...
JWT_SECRET=replace-with-a-long-random-secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Frontend environment variables:

```env
VITE_API_URL=https://YOUR-BACKEND.onrender.com/api
```

Deploy flow:

1. Push this repo to GitHub.
2. In Render, create a new Blueprint from the GitHub repo.
3. Add the backend secret environment values.
4. Add `VITE_API_URL` to the frontend after the backend URL is known.
5. Add `CLIENT_URL` to the backend after the frontend URL is known.
6. Redeploy both services after setting those cross-service URLs.
