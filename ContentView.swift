// ContentView.swift

import SwiftUI
import OSLog   // Use the modern module for Logger

// Define a shared logger for the app
private let logger = Logger(subsystem: Bundle.main.bundleIdentifier!, category: "CallBellAppUI")

/// Types of patient requests
enum CallType: String {
    case nurse = "NURSE_ASSISTANCE"
    case water = "WATER_REQUEST"
    case pain  = "PAIN_MEDICATION"
    // Extend as needed…
}

struct ContentView: View {
    @State private var showingConfirmation = false
    @State private var confirmationMessage = ""

    var body: some View {
        VStack {
            Spacer()

            Text("Hospital Call Bell")
                .font(.system(size: 48, weight: .bold))
                .padding(.bottom, 50)

            // — Primary Call Button —
            callButton(
                icon: "bell.fill",
                title: "Call Nurse",
                background: Color.blue
            ) {
                logger.info("Call Nurse tapped")
                sendCallBellSignal(type: .nurse)
                showConfirmation("Nurse Call Sent")
            }

            // — Example: Additional Button (commented out) —
//            callButton(
//                icon: "drop.fill",
//                title: "Need Water",
//                background: Color.green
//            ) {
//                logger.info("Water Request tapped")
//                sendCallBellSignal(type: .water)
//                showConfirmation("Water Request Sent")
//            }
//            .padding(.top, 20)

            Spacer()

            if showingConfirmation {
                Text(confirmationMessage)
                    .font(.title2)
                    .padding()
                    .background(Color.gray.opacity(0.2))
                    .cornerRadius(10)
                    .transition(.opacity.animation(.easeInOut(duration: 0.5)))
                    .onAppear {
                        DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
                            withAnimation {
                                showingConfirmation = false
                            }
                        }
                    }
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(UIColor.systemGroupedBackground))
        .edgesIgnoringSafeArea(.all)
    }

    // MARK: - View Builders

    private func callButton(
        icon: String,
        title: String,
        background: Color,
        action: @escaping () -> Void
    ) -> some View {
        Button(action: action) {
            VStack {
                Image(systemName: icon)
                    .resizable()
                    .scaledToFit()
                    .frame(width: 100, height: 100)
                Text(title)
                    .font(.system(size: 36, weight: .medium))
            }
            .frame(maxWidth: .infinity, minHeight: 200)
            .padding(40)
            .background(background)
            .foregroundColor(.white)
            .cornerRadius(25)
        }
        .padding(.horizontal, 40)
    }

    // MARK: - Helpers

    private func showConfirmation(_ message: String) {
        confirmationMessage = message
        showingConfirmation = true
        logger.debug("Showing confirmation: \(message)")
    }

    /// Placeholder: swap in your real call‑bell API or SDK integration here.
    private func sendCallBellSignal(type: CallType) {
        logger.log("Sending call signal — type: \(type.rawValue)")
        // TODO: Replace with URLSession / Bluetooth / SDK calls…
        print("[SIMULATION] Call signal: \(type.rawValue)")
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
