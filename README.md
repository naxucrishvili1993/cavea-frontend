# Cavea Frontend

A modern inventory management system built with React, TypeScript, and Vite.

## Features

- **Inventory Management** - View, add, and delete inventory items
- **Location Management** - Manage warehouse/store locations
- **Statistics Dashboard** - View inventory counts and total prices by location
- **Filtering & Sorting** - Filter by location, sort by name/price/location
- **Pagination** - Navigate through large inventory lists
- **Form Validation** - Zod schema validation for data integrity
- **Dark Mode UI** - Built with shadcn/ui components

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - UI components
- **Axios** - HTTP client
- **Zod** - Schema validation
- **Sonner** - Toast notifications

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running on `http://localhost:5000`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── api/           # API client functions
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── pages/         # Route pages
├── types/         # TypeScript type definitions
└── lib/           # Utility functions
```

## API Configuration

Update the API URL in `src/api/inventories.ts` and `src/api/locations.ts`:

```typescript
const API = "http://localhost:5000"; // Change if needed
```

## Available Routes

- `/inventories` - Inventory list with filters
- `/add-inventory` - Add new inventory item
- `/manage-locations` - Manage locations
- `/statistics` - View statistics by location
