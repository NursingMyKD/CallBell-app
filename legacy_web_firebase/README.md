# iControlBell – Native iOS App

**iControlBell** is a fully native, offline-first iOS app designed to empower patients and streamline care in healthcare facilities. The app provides a multilingual, accessible, and modular call bell and soundboard experience, supporting 28 languages and optimized for privacy and reliability.

## Overview

- **Platform:** iOS (Swift, SwiftUI)
- **Languages Supported:** 28 (with full UI and phrase localization)
- **Offline:** All data and UI strings are stored locally (no internet or backend required)
- **Accessibility:** VoiceOver support, large touch targets, and clear feedback
- **Modular Codebase:** Models, views, state, and utilities are organized for maintainability
- **Bluetooth Connectivity:** Integrates with hospital call bell systems via secure Bluetooth communication (see below)

## Features

- **Soundboard & Call Requests:** Patients can request help or express needs using categorized phrases in their native language
- **Language Selector:** Instantly switch between 28 supported languages
- **Accessible UI:** Designed for ease of use by patients with diverse needs
- **Localizable:** All UI strings and phrase data are managed via Xcode `.strings` and `.plist` files
- **No Cloud Required:** All features work fully offline for maximum privacy and reliability
- **Bluetooth Call Bell Integration:** Connects to hospital call bell hardware using Bluetooth Low Energy (BLE) for seamless nurse call activation

## Bluetooth Connectivity & Healthcare Compliance

The app is designed to connect to hospital call bell systems using Bluetooth Low Energy (BLE). This enables the iPad to act as a bridge between the patient and the hospital's nurse call infrastructure.

- **Secure BLE Communication:** Only authorized, paired devices can connect. All data is encrypted in transit.
- **Healthcare Compliance:** The app is architected to support HIPAA and other healthcare privacy/security standards. No patient data is transmitted outside the device. All communication with hospital systems is local and secure.
- **Integration:** The Bluetooth module is modular and can be adapted to different hospital call bell protocols and hardware.
- **Audit & Logging:** All connection attempts and call activations are logged locally for compliance and troubleshooting.

## Project Structure

```text
iControlbell/
  iControlbell/
    Assets.xcassets/         # App icons and images
    Resources/              # Localizable.strings, SoundboardCategories.plist, CallRequestOptions.plist
    src/
      models/               # Language.swift, SoundboardCategory.swift, CallRequestOption.swift
      views/                # ContentView.swift, LogoView.swift, etc.
      state/                # AppState.swift
      utils/                # PlistLoader.swift
    ...
```

## Getting Started

1. Open `iControlbell/iControlbell.xcodeproj` in Xcode.
2. Build and run the app on a simulator or device (no configuration or backend required).
3. To add or update languages, phrases, or UI strings, edit the `.plist` and `.strings` files in `Resources/`.

## Customization

- **Add Languages:** Update `Language.swift` and provide translations in resource files.
- **Edit Categories/Phrases:** Modify `SoundboardCategories.plist` and `CallRequestOptions.plist`.
- **UI Strings:** Use `Localizable.strings` for all user-facing text.

## Legacy Files

All web, Firebase, and Node.js files are now obsolete and can be safely removed.

## License

MIT
