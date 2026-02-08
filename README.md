# Architekt & Meister

E-commerce website for custom furniture and architectural design services.

## Features

- Product catalog with detailed product pages
- Order management with Neon (PostgreSQL) and Vercel API
- Automated email notifications via Resend (customer confirmation + business alerts)
- Responsive design with smooth animations

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Neon (PostgreSQL)
- **Backend**: Vercel Serverless Functions (`/api/order`)
- **Email**: Resend
- **Deployment**: Vercel

## Local Development

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (for API + DB, used when running `vercel dev` or in production):
   Create `.env.local` (or set in Vercel Dashboard):
   ```env
   DATABASE_URL=your-neon-connection-string
   RESEND_API_KEY=your-resend-api-key
   BUSINESS_EMAIL=architektundmeister@gmail.com
   FROM_EMAIL=onboarding@resend.dev
   REPLY_TO_EMAIL=architektundmeister@gmail.com
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   To test the order flow locally (API route), use `npx vercel dev` instead so `/api/order` is available.

4. Open `http://localhost:5173` in your browser

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration.

### Environment Variables for Vercel

Add these in your Vercel project settings:
- `DATABASE_URL` – Neon PostgreSQL connection string
- `RESEND_API_KEY` – Resend API key for emails
- `BUSINESS_EMAIL` (optional, default: architektundmeister@gmail.com)
- `FROM_EMAIL` (optional, default: onboarding@resend.dev)
- `REPLY_TO_EMAIL` (optional)

### Database setup (Neon)

1. Create a project at [neon.tech](https://neon.tech) and copy the connection string.
2. In Neon SQL Editor, run the schema from `supabase/schema-neon.sql` to create the `orders` table.

## Project Structure

- `App.tsx` – Main application component with routing
- `api/order.ts` – Vercel serverless API: save order to Neon, send emails via Resend
- `supabase/schema-neon.sql` – Neon schema for `orders` (no RLS)
- `data.ts` – Product and legal text data
- `types.ts` – TypeScript type definitions
