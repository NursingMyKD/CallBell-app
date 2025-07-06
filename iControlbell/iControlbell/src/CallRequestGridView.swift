// CallRequestGridView.swift
// Grid of call request buttons

import SwiftUI

struct CallRequestGridView: View {
    var selectedLanguage: Language
    // Placeholder for call request options
    let callRequests: [CallRequestOption] = CallRequestOption.defaultOptions
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Use localized section title if needed
            // Text(AppStrings.callRequestGridTitle(for: selectedLanguage))
            Text("Call Requests")
                .font(.headline)
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 120), spacing: 16)], spacing: 16) {
                ForEach(callRequests) { option in
                    Button(action: {
                        // Example: Show toast on button press
                        // Replace with real logic as needed
                        let message = option.label(for: selectedLanguage) + " request sent!"
                        if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
                           let delegate = windowScene.delegate as? SceneDelegate,
                           let appState = delegate.appState {
                            appState.showToast(message)
                        }
                    }) {
                        VStack {
                            Image(systemName: option.iconName)
                                .resizable()
                                .frame(width: 40, height: 40)
                                .padding(.bottom, 8)
                            Text(option.label(for: selectedLanguage))
                                .multilineTextAlignment(.center)
                        }
                        .padding()
                        .frame(maxWidth: .infinity, minHeight: 100)
                        .background(Color(.secondarySystemBackground))
                        .cornerRadius(16)
                        .shadow(radius: 2)
                    }
                    .accessibilityLabel(option.accessibilityLabel(for: selectedLanguage))
                    .accessibilityAddTraits(.isButton)
                    .accessibilityHint("Double tap to send request.")
                }
            }
        }
        .padding(.vertical)
    }
}

struct CallRequestOption: Identifiable {
    let id = UUID()
    let type: String
    let iconName: String
    let labels: [Language: String]
    
    func label(for lang: Language) -> String {
        labels[lang] ?? type
    }
    
    func accessibilityLabel(for lang: Language) -> String {
        "Request \(label(for: lang))"
    }
    
    static let defaultOptions: [CallRequestOption] = [
        CallRequestOption(type: "help", iconName: "bell.fill", labels: [.english: "Help", .spanish: "Ayuda", .french: "Aide"]),
        CallRequestOption(type: "water", iconName: "drop.fill", labels: [.english: "Water", .spanish: "Agua", .french: "Eau"]),
        // ...add more options
    ]
}

#Preview {
    CallRequestGridView(selectedLanguage: .english)
}
