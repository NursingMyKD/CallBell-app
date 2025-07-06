// CallRequestGridView.swift
// Grid of call request buttons

import SwiftUI

struct CallRequestGridView: View {
    var selectedLanguage: Language
    var callRequests: [CallRequestOption]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("call_request_grid_title".localized)
                .font(.headline)
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 120), spacing: 16)], spacing: 16) {
                ForEach(callRequests) { option in
                    Button(action: {
                        let message = (option.labels[selectedLanguage.rawValue] ?? option.type) + " request sent!"
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
                            Text(option.labels[selectedLanguage.rawValue] ?? option.type)
                                .multilineTextAlignment(.center)
                        }
                        .padding()
                        .frame(maxWidth: .infinity, minHeight: 100)
                        .background(Color(.secondarySystemBackground))
                        .cornerRadius(16)
                        .shadow(radius: 2)
                    }
                    .accessibilityLabel(option.labels[selectedLanguage.rawValue] ?? option.type)
                    .accessibilityAddTraits(.isButton)
                    .accessibilityHint("Double tap to send request.")
                }
            }
        }
        .padding(.vertical)
    }
}
