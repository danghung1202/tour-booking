# Tour Booking Platform

A modern web application for booking tours with local guides around the world.

## Tech Stack

- **Frontend**: Next.js 15.4 with TypeScript
- **Styling**: CSS Modules
- **Backend**: Supabase
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tour-booking/web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This project is set up for automatic deployment to Vercel:

- Pushes to the `main` branch will deploy to the production environment.
- Pushes to other branches will create preview deployments.

## Project Structure

- `src/app`: Next.js App Router pages
- `src/components`: Reusable React components
- `src/lib`: Utility functions and libraries (including Supabase client)

## CSS Modules

This project uses CSS Modules for component-specific styling. Each component has its own `.module.css` file that is imported and used within the component.
