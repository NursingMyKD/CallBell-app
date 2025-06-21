# iControlBell - Smart Patient Assistance

![iControlBell Logo](public/iControlBell-logo.png)

iControlBell is an intelligent, compassionate, and multilingual call bell system designed to empower patients and streamline care in healthcare facilities. By leveraging AI-powered voice commands and a simple, intuitive interface, iControlBell ensures that every patient's need is heard and addressed promptly.

## Project Overview

This Next.js application serves as the central hub for the iControlBell system. It provides a user-friendly interface for patients to make requests, and a real-time dashboard for caregivers to monitor and respond to those requests. The system is designed to be accessible, and with multilingual support, it breaks down communication barriers to provide equitable care for all.

![App Screenshot](https://storage.googleapis.com/project-os-prod/images/22614b1c-7f72-4d31-8975-f09c693a0279.png)

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI, Radix UI, and Lucide React
- **AI**: Google AI with Genkit
- **Backend**: Firebase
- **Mobile**: Swift (for potential future iOS integration)

## Features

- **One-Touch & Voice-Activated Requests**: Patients can easily request assistance for common needs like "Water", "Restroom", or "Pain" with a single tap or by speaking in their native language.
- **Real-Time Dashboard**: A centralized grid displays all active patient requests, allowing caregivers to prioritize and respond efficiently.
- **Multilingual Support**: The system is designed to understand and respond to requests in multiple languages, ensuring clear communication and reducing the risk of misunderstandings.
- **Auditory Feedback**: The system provides clear audio cues to confirm that a request has been successfully placed.

## Getting Started

1.  **Clone the repository.**
2.  **Install dependencies**: `npm install`
3.  **Set up your Firebase project** and add your configuration to `.env.local`.
4.  **Run the development server**: `npm run dev`

This will start the app on `http://localhost:9002`.

## Deployment

The application is configured for deployment with Firebase App Hosting.
