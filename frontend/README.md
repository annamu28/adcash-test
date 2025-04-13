# Campaign Management Tool - Frontend

This is the frontend for the Campaign Management Tool, built with React, TypeScript, and Material UI.

## Prerequisites

- Node.js v18.20 or higher
- npm (comes with Node.js)
- Backend server running (see backend README.md)

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd adcash-test/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=http://localhost:8000
```

This environment variable is used to configure the API URL for all API requests. If you're running the backend on a different port or host, update this value accordingly.

### 4. Start the development server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint to check for code issues
- `npm run preview` - Preview the production build locally

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components for different routes
- `src/contexts/` - React context providers (Auth, etc.)
- `src/services/` - API service functions
- `src/hooks/` - Custom React hooks
- `src/types/` - TypeScript type definitions
- `src/style/` - Global CSS styles

## Features

- User authentication (login, register, logout)
- Campaign management (create, list, update status)
- Responsive design for all screen sizes
- Form validation
- Error handling

## Connecting to the Backend

The frontend is configured to connect to the backend using the `VITE_API_URL` environment variable. Make sure the backend server is running before starting the frontend.

## Troubleshooting

- If you encounter CORS issues, ensure the backend has the correct CORS configuration
- For authentication issues, check that the backend is running and accessible
- If the page doesn't load, check the browser console for errors
- For TypeScript errors, run `npm run lint` to identify issues