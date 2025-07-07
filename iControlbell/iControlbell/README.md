# iControlbell

This is a SwiftUI iOS app for healthcare call bell communication, supporting 28 languages, Bluetooth integration, and full offline operation. The codebase is modularized under `src/`, with all UI/data strings and categories in resource files under `Resources/`. SwiftLint and unit tests are integrated. To build, open the Xcode project (to be created) in the `iControlbell/` directory, ensure all resources are referenced, and run on an iOS device or simulator.

## Features

- Modular SwiftUI architecture
- 28-language localization
- Bluetooth call bell integration
- All data/resources local (no network required)
- Healthcare privacy and accessibility compliance
- SwiftLint and unit tests

## Setup

1. Open the Xcode project (to be created) in the `iControlbell/` directory.
2. Ensure all resources in `Resources/` are included in the project.
3. Build and run on an iOS device or simulator.
4. Run unit tests via Xcode.

## Notes

- If the `.xcodeproj` is missing, create a new SwiftUI iOS project in Xcode and add all files from `src/` and `Resources/`.
- Make sure to enable localization and Bluetooth permissions in the project settings.
- SwiftLint is configured via `.swiftlint.yml`.
