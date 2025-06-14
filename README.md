# CallBell Applications

This repository hosts the CallBell project, which includes a Next.js web application and a native Swift iOS application. Both applications aim to provide users with a way to signal for assistance, with requests logged to a Firebase backend.

## Project Overview

*(Existing Next.js project overview can be expanded here if desired.)*

This repository contains:
1.  A **Next.js web application** providing a user interface for call bell requests, integrated with Firebase and potentially AI features via Genkit.
2.  A **native Swift iOS application** offering similar call bell functionality, built with SwiftUI and Firebase Firestore for data storage.

Both applications can be configured to use the same Firebase project, allowing for a unified backend for request logging.

---

## iOS Application (Swift)

### Overview
The iControlBell iOS app is a native application built with SwiftUI. It allows users to send various types of call bell requests, which are then logged to a Firebase Firestore database. The app supports multiple languages and includes a text-to-speech soundboard for quick communication.

### Features
-   Multiple call request types (e.g., Pain, Bathroom, Water).
-   User interface localized in English, Spanish, and French.
-   Text-to-speech soundboard for common phrases.
-   Integration with Firebase Firestore for logging call requests to the "callRequests" collection.
-   Built entirely with SwiftUI for a modern iOS experience.
-   Uses Swift Package Manager for dependency management.

### Tech Stack (iOS)
-   **UI Framework**: SwiftUI
-   **Language**: Swift
-   **Backend Integration**: Firebase Firestore Swift SDK
-   **Dependency Management**: Swift Package Manager (SPM)

### Prerequisites (iOS)
-   Xcode 14 or later (the project is configured for iOS 15 and uses modern Swift features).
-   Swift (version compatible with your Xcode, typically Swift 5.7+).
-   An Apple Developer account if you wish to run the app on a physical device.

### Setup & Running (iOS)

1.  **Clone the Repository:**
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Firebase Configuration:**
    *   Navigate to your [Firebase project console](https://console.firebase.google.com/).
    *   If you haven't already, add an iOS app to your Firebase project.
        *   You will need to provide an **iOS Bundle ID**. A common choice is reverse domain name notation, e.g., `com.yourcompany.iControlBellApp`. You can set this Bundle ID in Xcode later (Target > Signing & Capabilities).
    *   Download the `GoogleService-Info.plist` file for your newly configured iOS app.
    *   Place this downloaded `GoogleService-Info.plist` file into the `swift/Sources/Resources/` directory within this project. You will need to replace the existing `GoogleService-Info.plist.placeholder` file.
    *   **Firestore Database Setup:**
        *   Ensure you have Firestore enabled in your Firebase project.
        *   The iOS app will attempt to write to a collection named `callRequests`.
        *   For initial development and testing, you can set open security rules for this collection (e.g., `rules_version = '2'; service cloud.firestore { match /databases/{database}/documents { match /callRequests/{documentId} { allow read, write: if true; } } }`).
        *   **Important:** Secure your Firestore rules appropriately before deploying to production.

3.  **Building & Running:**
    *   Open the Swift package in Xcode:
        *   In Xcode, select **File > Open...**.
        *   Navigate to the root of the cloned repository and then into the `swift` directory.
        *   Select the `Package.swift` file and click **Open**.
    *   Xcode will automatically resolve package dependencies (FirebaseFirestoreSwift).
    *   Once Xcode has loaded the package, select the `iControlBellApp` scheme and an iOS simulator (e.g., iPhone 14 Pro) or a connected physical device.
    *   Build and run the application (Cmd+R).

### Localization (iOS)
-   The app is structured to support English (default), Spanish, and French.
-   Translations are managed using `.strings` files located in language-specific `.lproj` directories within `swift/Sources/Resources/` (e.g., `en.lproj/Localizable.strings`, `es.lproj/Localizable.strings`).
-   The provided `es.lproj` and `fr.lproj` files contain placeholders and require full translation for complete Spanish and French support.

---

## Next.js Web Application

*(This section retains the original documentation for the Next.js application.)*

This project is a Next.js application, likely bootstrapped or intended for use with Firebase and potentially AI features via Genkit. It's set up with TypeScript, Tailwind CSS, and a suite of modern development tools.

### Tech Stack (Next.js)

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

### Prerequisites (Next.js)

- Node.js (e.g., v18.x or v20.x - check `package.json` engines if specified, or test with current LTS)
- Yarn or NPM
- Firebase project setup and configuration (if using Firebase services).

### Getting Started (Next.js)

#### 1. Clone the repository (if applicable)

#### 2. Install Dependencies
```bash
# Using Yarn
yarn install

# Or using NPM
npm install
```

#### 3. Environment Variables
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

#### 4. Run the Development Server
```bash
# Using Yarn
yarn dev

# Or using NPM
npm run dev
```
This will start the Next.js development server, typically on `http://localhost:9002` (as per your `dev` script).

#### 5. Running Genkit (if applicable)
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

### Available Scripts (Next.js)

- `dev`: Starts the Next.js development server with Turbopack.
- `genkit:dev`: Starts the Genkit development flow.
- `genkit:watch`: Starts the Genkit development flow with file watching.
- `build`: Builds the application for production.
- `start`: Starts a Next.js production server.
- `lint`: Runs ESLint.
- `typecheck`: Runs TypeScript compiler for type checking.
- `postinstall`: Runs `patch-package` (if applicable).

### Deployment (Next.js)

*(Add instructions or notes on how to deploy this application, e.g., to Vercel, Firebase Hosting, or other platforms.)*

### Further Exploration (Next.js)

To get started with the application code, take a look at `src/app/page.tsx`.
The global styles and CSS variables are defined in `src/app/globals.css`.
Tailwind CSS configuration is in `tailwind.config.ts`.

---
## Backend Notes
Both the Next.js web application and the Swift iOS application can be configured to use the same Firebase project. The iOS application specifically logs requests to a Firestore collection named `callRequests`. If the Next.js application also uses Firestore for similar purposes, ensure collection names and data structures are managed accordingly.
