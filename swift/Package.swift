// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "iControlBellApp", // Changed from CallBellSwift
    platforms: [
        .iOS(.v15) // Changed from .macOS(.v13)
    ],
    dependencies: [
        .package(url: "https://github.com/firebase/firebase-ios-sdk.git", from: "10.0.0"),
        // .package(url: "https://github.com/firebase/firebase-ios-sdk.git", .upToNextMajor(from: "10.10.0")) // Placeholder for FirebaseAuth
    ],
    products: [
        .executable(name: "iControlBellApp", targets: ["iControlBellApp"]) // Changed from CallBellSwift
    ],
    targets: [
        .executableTarget(
            name: "iControlBellApp", // Changed from CallBellSwift
            dependencies: [
                .product(name: "FirebaseFirestoreSwift", package: "firebase-ios-sdk"),
                // .product(name: "FirebaseAuth", package: "firebase-ios-sdk"), // Placeholder for FirebaseAuth
            ],
            path: "Sources",
            resources: [ // Added resources
                .process("Resources")
            ]
        ),
        .testTarget( // Added test target
            name: "CallBellTests",
            dependencies: ["iControlBellApp", .product(name: "FirebaseFirestore", package: "firebase-ios-sdk")] // Added FirebaseFirestore dependency
        ),
    ]
)
