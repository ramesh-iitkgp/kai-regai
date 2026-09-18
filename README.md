# Kai RegAI — AI-Powered Traditional Palm Reading (Samudrika Shastra)

Kai RegAI is a modern, culturally grounded AI palm reading web application that interprets physical palm line features and hand structures using classical Samudrika Shastra and Brihat Samhita principles.

## Features

- **Multilingual Native Experience**: Seamless real-time adaptation across 12 Indian languages with authentic native scripts (English, हिन्दी, தமிழ், తెలుగు, മലയാളം, ಕನ್ನಡ, বাংলা, मराठी, ગુજરાતી, ਪੰਜਾਬੀ, ଓଡ଼ିଆ, অসমীয়া).
- **Welcome Onboarding Screen**: Clean start screen with language selection, optional user naming (defaults to Palm 1), and hand choice (Right Karma / Left Prarabdha).
- **Interactive Palm Map & Line Visualizer**: Real-time line calibration (pan, scale, rotate) and organic anatomical curve rendering with crease edge enhancement.
- **Ask Kai**: Grounded conversational drawer providing personalized insights based on detected hand features, lines, and classical citations.
- **WhatsApp & Full Report Sharing**: Direct Web Share API file attachment on mobile, with printable A4 multi-page Palmistry Report PDF generation and automatic image download.
- **Apple-Grade Aesthetics**: Modern dark mode, glassmorphism, responsive mobile-first layouts, and accessible touch targets.

## Project Structure

```
kai-regai/
├── apps/
│   ├── web/         # React + Vite frontend application
│   └── api/         # Node.js + Express API backend
└── packages/
    └── contracts/   # Shared TypeScript types and contracts
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
# Run Web Client (Vite)
npm run dev --workspace=web

# Run API Backend
npm run dev:api
```

### 3. Run Tests
```bash
npm test --workspaces
```

## Google AI Studio Integration
This repository can be imported directly into Google AI Studio to connect Gemini Vision and Multimodal models for advanced palm crease detection and landmark tracking.
