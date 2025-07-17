# Unique Tours Platform

A modern platform connecting travelers with authentic, offbeat tour experiences led by passionate local guides.

## Overview

The Unique Tours Platform bridges the gap between travelers seeking authentic experiences and local guides offering specialized tours. Our platform emphasizes rich storytelling and unique, off-the-beaten-path adventures while providing guides with effective tools to manage their offerings.

### Key Features

- **For Tourists**
  - Browse and book unique local tours
  - Search and filter by categories
  - Submit pre-booking questions
  - Manage bookings and cancellations
  - No account required for booking (guest checkout available)

- **For Tour Guides**
  - Create and manage detailed tour listings
  - Craft compelling tour stories with rich-text editor
  - Manage tour availability
  - Handle booking requests
  - Maintain guide profile

- **Platform Highlights**
  - Clean, modern UI inspired by atasteofhanoi.com
  - Mobile-first responsive design
  - Secure booking management
  - Category-based tour organization
  - Email notifications for key actions

## Documentation

Find detailed project documentation in the `/docs` directory:

1. [`project-brief.md`](/docs/project-brief.md) - Initial project requirements and goals
2. [`prd.md`](/docs/prd.md) - Comprehensive Product Requirements Document
3. [`front-end-spec.md`](/docs/front-end-spec.md) - Frontend specifications and UI/UX guidelines
4. [`front-end-architecture.md`](/docs/front-end-architecture.md) - Frontend architectural design and patterns
5. [`fullstack-architecture.md`](/docs/fullstack-architecture.md) - Complete system architecture and technical design
6. [`v0-prompts/`](/docs/v0-prompts/) - Initial project v0 prompts

## Technology Stack

- **Frontend**: Next.js (React) with TypeScript
- **Styling**: CSS Modules
- **Backend**: Next.js API routes, Supabase
- **Database & Auth**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm or yarn
- Supabase account
- Vercel account

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

### Development

```bash
# Run the development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

### Deployment

This project is set up for automatic deployment to Vercel:

- Pushes to the `main` branch will deploy to the production environment.
- Pushes to other branches will create preview deployments.

### Project Structure

- `src/app`: Next.js App Router pages
- `src/components`: Reusable React components
- `src/lib`: Utility functions and libraries (including Supabase client)

### CSS Modules

This project uses CSS Modules for component-specific styling. Each component has its own `.module.css` file that is imported and used within the component.

## Contributing

This project is currently in MVP phase. Contribution guidelines will be added soon.

## License

MIT License

## Contact

For any inquiries, please [contact details TBD].
