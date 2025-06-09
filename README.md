# CallBell App (Next.js Starter)

This project is a Next.js application, likely bootstrapped or intended for use with Firebase and potentially AI features via Genkit. It's set up with TypeScript, Tailwind CSS, and a suite of modern development tools.

## Project Overview

*(Please replace this section with a more detailed description of your application's purpose and features.)*

This application serves as a starting point for building...

## Tech Stack

- **Framework**: Next.js 15 (with Turbopack for development)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with `tailwindcss-animate`
- **UI Components**: Radix UI primitives, `lucide-react` for icons
- **State Management/Data Fetching**: TanStack Query (React Query) with `@tanstack-query-firebase/react`
- **Forms**: React Hook Form with Zod for validation
- **AI Integration**: Genkit (with Google AI)
- **Firebase**: Integrated for backend services (authentication, database, etc.)
- **Linting/Formatting**: ESLint (as per Next.js defaults)
- **Package Manager**: (Assumed Yarn or NPM based on `.gitignore` and `package.json`)
- **Swift Prototype**: Early Swift port located in `swift/`

## Prerequisites

- Node.js (e.g., v18.x or v20.x - check `package.json` engines if specified, or test with current LTS)
- Yarn or NPM
- Firebase project setup and configuration (if using Firebase services).

## Getting Started

### 1. Clone the repository (if applicable)

### 2. Install Dependencies
```bash
# Using Yarn
yarn install

# Or using NPM
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root of the project. You might want to copy from an example file if one is provided (e.g., `.env.example`).

Example `.env.local`:
```env
# Firebase configuration (replace with your actual Firebase project config)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Genkit/Google AI (if applicable)
GOOGLE_API_KEY=your_google_api_key
```

### 4. Run the Development Server
```bash
# Using Yarn
yarn dev

# Or using NPM
npm run dev
```
This will start the Next.js development server, typically on `http://localhost:9002` (as per your `dev` script).

### 5. Running Genkit (if applicable)
To start the Genkit development flow:
```bash
# Using Yarn
yarn genkit:dev

# Or using NPM
npm run genkit:dev
```
For watching changes:
```bash
# Using Yarn
yarn genkit:watch

# Or using NPM
npm run genkit:watch
```

## Available Scripts

- `dev`: Starts the Next.js development server with Turbopack.
- `genkit:dev`: Starts the Genkit development flow.
- `genkit:watch`: Starts the Genkit development flow with file watching.
- `build`: Builds the application for production.
- `start`: Starts a Next.js production server.
- `lint`: Runs ESLint.
- `typecheck`: Runs TypeScript compiler for type checking.
- `postinstall`: Runs `patch-package` (if applicable).

## Deployment

*(Add instructions or notes on how to deploy this application, e.g., to Vercel, Firebase Hosting, or other platforms.)*

## Further Exploration

To get started with the application code, take a look at `src/app/page.tsx`.
The global styles and CSS variables are defined in `src/app/globals.css`.
Tailwind CSS configuration is in `tailwind.config.ts`.
