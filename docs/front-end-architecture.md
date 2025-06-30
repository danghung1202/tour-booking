# Unique Tours Platform Frontend Architecture Document

*Version: 1.0*
*Date: 2025-06-30*

## Template and Framework Selection

Based on a review of the `prd.md` and the main architecture document, this project will be built as a new, greenfield application.

  * **Framework:** The technology stack is confirmed as **Next.js**.
  * **Starter Template:** No specific starter template (e.g., T3 Stack, Vite) has been selected. Development will proceed by setting up a standard Next.js application from scratch. This provides maximum flexibility but requires manual setup for all tooling and configuration.

### Change Log

| Date | Version | Description | Author |
| :--- | :------ | :---------- | :----- |
| 2025-06-30 | 1.0 | Initial draft of the Frontend Architecture Document. | Winston (Architect) |

-----

## Frontend Tech Stack

This section is a subset of the main Technology Stack Table, detailing the specific tools and libraries for the frontend application. These choices must remain synchronized with the main architecture document.

### Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Framework** | Next.js | \~14.2 | The core React framework for the application. | Mandated by the PRD for its features like SSR, API routes, and fast development cycle. |
| **UI Library** | Custom Components | N/A | Building UI elements based on the UI/UX spec. | The UI/UX spec calls for a unique, minimalist style, making a custom library more suitable. |
| **State Management** | React Context API | \~18.3 | For managing simple, global UI state like user sessions. | Sufficient for MVP needs without adding the complexity of a larger library. |
| **Routing** | Next.js App Router | \~14.2 | Handles all client-side and server-side routing. | The current standard for Next.js, providing file-based routing and layouts. |
| **Build Tool** | Next.js CLI | \~14.2 | Building, serving, and exporting the application. | The default and required build tool for Next.js projects. |
| **Styling** | CSS Modules | N/A | Scoped CSS for styling individual components. | Provides locally-scoped styles out-of-the-box with Next.js, preventing style conflicts. |
| **Testing** | Jest / RTL | \~29.7 | Unit and integration testing for components. | Industry standard for React/Next.js; supports the PRD's focused testing approach. |
| **Form Handling** | React Hooks (`useState`) | \~18.3 | Managing form state and inputs. | For the MVP, controlled components using React's built-in hooks are sufficient and avoid new dependencies. |
| **Animation** | CSS Transitions | N/A | Simple hover effects and page transitions. | Lightweight, performant, and sufficient for the subtle animations described in the UI/UX spec. |

-----

## Project Structure

This section defines the exact directory structure for the frontend application. A clear and consistent structure is essential for maintainability and makes it easy for developers and AI agents to locate and add files. This structure is based on the Next.js App Router conventions.

```plaintext
apps/web/
├── app/                  # Next.js App Router
│   ├── (auth)/           # Route group for auth pages (login, register)
│   ├── dashboard/        # Protected dashboard routes
│   ├── tours/            # Public tour routes
│   │   ├── [tourId]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── api/              # Backend API routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/           # Shared React components
│   ├── common/           # Complex components used across many pages (Header.tsx, TourCard.tsx)
│   ├── features/         # Components specific to a feature (BookingForm.tsx)
│   └── ui/               # Basic UI primitives (Button.tsx, Input.tsx, Card.tsx)
├── context/              # React Context providers (e.g., AuthProvider.tsx)
├── hooks/                # Custom React hooks (e.g., useAuth.ts)
├── lib/                  # Utility functions and library initializations (apiClient.ts)
├── services/             # API communication layer (tourService.ts)
├── public/               # Static assets (images, fonts)
└── ...
```

-----

## Component Standards

To ensure consistency, all components must follow a standard pattern and naming convention.

### Component Template

All new components should follow this basic template structure.

```typescript
// Example: src/components/common/TourCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define the props for the component using a TypeScript type
type TourCardProps = {
  tourId: string;
  title: string;
  imageUrl: string;
  price: number;
};

const TourCard: React.FC<TourCardProps> = ({ tourId, title, imageUrl, price }) => {
  return (
    <div className="tour-card">
      <Image src={imageUrl} alt={title} width={400} height={300} />
      <h3>{title}</h3>
      <p>From ${price}</p>
      <Link href={`/tours/${tourId}`}>View Tour</Link>
    </div>
  );
};

export default TourCard;
```

### Naming Conventions

  * **Component Files:** `PascalCase.tsx` (e.g., `TourCard.tsx`)
  * **Component Folders:** `kebab-case` for feature components (e.g., `booking-form/`)
  * **Custom Hooks:** `useCamelCase.ts` (e.g., `useAuth.ts`)
  * **CSS Modules:** `ComponentName.module.css` (e.g., `TourCard.module.css`)

-----

## State Management

This section defines the patterns for managing state within the frontend application, based on the `React Context API` selected in the tech stack.

### Store Structure

For the MVP, we will create a single global context to manage authentication state.

```plaintext
context/
└── AuthContext.tsx
```

### State Management Template

The `AuthContext.tsx` file will contain the provider, the context itself, and a custom hook for easy consumption.

```typescript
// context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient'; 

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSessionData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    getSessionData();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = { user, session, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

-----

## API Integration

This section defines the specific patterns for how the frontend application will communicate with the backend API Layer.

### Service Template

API calls for a specific data resource will be grouped into a "service" file.

```typescript
// services/tourService.ts
import apiClient from '@/lib/apiClient';
import { Tour } from '@/packages/types';

export const tourService = {
  getAll: async (): Promise<Tour[]> => {
    return apiClient('/tours');
  },
  getById: async (id: string): Promise<Tour> => {
    return apiClient(`/tours/${id}`);
  },
  create: async (tourData: Omit<Tour, 'id' | 'created_at'>): Promise<Tour> => {
    return apiClient('/tours', {
      method: 'POST',
      body: JSON.stringify(tourData),
    });
  },
};
```

### API Client Configuration

A wrapper around the browser's `fetch` API will centralize logic for adding the base URL, setting headers, and handling responses.

```typescript
// lib/apiClient.ts
import { createBrowserClient } from '@supabase/ssr';

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: { session } } = await supabase.auth.getSession();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (session) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
    }

    const response = await fetch(`/api/v1${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorPayload = await response.json();
        throw new Error(errorPayload.error?.message || 'An API error occurred');
    }

    return response.json();
};
```

-----

## Routing

This section outlines the routing configuration using the Next.js App Router.

### Route Configuration

The file system within the `app/` directory defines the routes.

```plaintext
app/
├── (auth)/
│   └── login/
│       └── page.tsx      # Renders at /login
├── dashboard/
│   └── page.tsx          # Renders at /dashboard
└── tours/
    ├── [tourId]/
    │   └── page.tsx      # Renders at /tours/some-uuid
    └── page.tsx          # Renders at /tours
```

-----

## Styling Guidelines

### Styling Approach

  * **Methodology:** **CSS Modules** for component-level styling.
  * **Global Styles:** A single `globals.css` file for base styles and CSS variables.

### Global Theme Variables

All theme values will be defined as CSS custom properties in `globals.css`.

```css
/* app/globals.css */
:root {
  /* Color Palette */
  --primary-color: #FF9900;
  --dark-background: #212121;
  --light-background: #FFFFFF;
  --primary-text-color: #FFFFFF;
  --secondary-text-color: #333333;

  /* Typography */
  --font-primary: 'Lora', serif;
  --font-secondary: 'Montserrat', sans-serif;
}
```

-----

## Testing Requirements

### Component Test Template

Tests will be written using Jest and React Testing Library (RTL).

```typescript
// Example: components/ui/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders the button with its children', () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText(/Click Me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Best Practices

1.  **Unit Tests**: Test individual components and custom hooks in isolation.
2.  **Focus on User Interaction**: Simulate how a user interacts with the component.
3.  **Mock API Calls**: Use Jest's mocking capabilities for API service calls.

-----

## Environment Configuration

Browser-exposed environment variables must be prefixed with `NEXT_PUBLIC_`.

```bash
# .env.local

# Public keys available to the browser for the Supabase client
NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```

-----

## Frontend Developer Standards

### Critical Coding Rules

  * **Component Size:** Keep components small and focused on a single responsibility.
  * **Props:** Always use TypeScript to define props for every component.
  * **Accessibility:** All form inputs must have a corresponding `<label>`. All images must have a meaningful `alt` prop.
  * **No Business Logic in Components:** Components are for UI only. Logic should be in hooks, services, or utilities.

### Quick Reference

  * **Create a new page:** Add a `page.tsx` file inside a new folder in the `app/` directory.
  * **Create a new component:** Add a `PascalCase.tsx` file to the appropriate `components/` subfolder.
  * **Add a new API call:** Add a new method to the relevant file in the `services/` directory.