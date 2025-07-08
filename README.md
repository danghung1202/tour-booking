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

## Technology Stack

- **Frontend**: Next.js (React)
- **Backend**: Next.js API routes
- **Database & Auth**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (version TBD)
- npm or yarn
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tour-booking.git

# Install dependencies
cd tour-booking
npm install

# Set up environment variables
cp .env.example .env.local
```

Configure the following environment variables in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- (Additional env variables TBD)

### Development

```bash
# Run the development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

## Contributing

This project is currently in MVP phase. Contribution guidelines will be added soon.

## License

[License Type TBD]

## Contact

For any inquiries, please [contact details TBD].
