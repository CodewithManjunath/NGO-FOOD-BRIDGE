# MongoDB Setup

FoodBridge uses MongoDB through the server-side Express API. The browser never connects directly to MongoDB.

## Configure

1. Install and start MongoDB locally, or create a MongoDB Atlas database and obtain its connection URI.
2. Copy `.env.example` to `.env` in the project root.
3. Set `MONGODB_URI` to your local or Atlas URI. Keep Atlas credentials private and never commit `.env`.
4. Replace `JWT_SECRET` with a random secret of at least 32 characters.
5. Set a private admin email and password. Admin passwords must be at least 12 characters. The server creates this administrator on first startup.
6. Install packages with `npm install`.

## Run locally

Start the API in one terminal:

```powershell
npm run server
```

Start Vite in a second terminal:

```powershell
npm run dev
```

Vite proxies `/api` requests to `http://localhost:4000`. Check API and database status at `http://localhost:4000/api/health`.

Donor accounts are stored with bcrypt-hashed passwords. No sample NGOs, shifts, donations, or signup counts are seeded. An administrator creates real NGO listings from the admin portal; each listing generates a one-time invitation code whose hash is stored in MongoDB. Donation requests are stored with a donor reference and a status. Money donations are pledges only; payment processing is not implemented.

NGO staff register as NGO members by choosing their NGO and entering its invite code. They can only see donations assigned to that NGO and can accept or decline open requests. NGO member accounts are stored separately from donor accounts.

For production, serve the frontend and API over HTTPS behind a reverse proxy, use a managed MongoDB deployment, and provision secrets through the hosting provider's secret manager.
