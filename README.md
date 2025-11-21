# Architekt & Meister

E-commerce website for custom furniture and architectural design services.

## Features

- Product catalog with detailed product pages
- Order management with Supabase backend
- Automated email notifications (customer confirmation + business alerts)
- Responsive design with smooth animations

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Supabase (Database + Edge Functions)
- **Email**: Resend
- **Deployment**: Vercel

## Local Development

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create `.env.local` file:
   ```env
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration.

### Environment Variables for Vercel

Add these in your Vercel project settings:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Project Structure

- `App.tsx` - Main application component with routing
- `lib/supabase.ts` - Supabase client configuration
- `supabase/functions/send-order-emails/` - Edge Function for email notifications
- `supabase/schema.sql` - Database schema
- `data.ts` - Product and legal text data
- `types.ts` - TypeScript type definitions
