import PackageDescription

let package = Package(
    name: "CallBellSwift",
    platforms: [
        .macOS(.v13)
    ],
    products: [
        .executable(name: "CallBellSwift", targets: ["CallBellSwift"])
    ],
    targets: [
        .executableTarget(
            name: "CallBellSwift",
            path: "Sources"
        )
    ]
)
