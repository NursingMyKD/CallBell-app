// ContentView.swift
// Main Home Screen for iControlBell

import SwiftUI

struct ContentView: View {
    @EnvironmentObject var appState: AppState
    
    var body: some View {
        NavigationView {
            VStack(spacing: 24) {
                LogoView()
                    .accessibilityHidden(true)
                Text(AppStrings.title(for: appState.selectedLanguage))
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .accessibilityAddTraits(.isHeader)
                Text(AppStrings.description(for: appState.selectedLanguage))
                    .font(.title3)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal)
                LanguageSelectorView(selectedLanguage: $appState.selectedLanguage)
                CallRequestGridView(selectedLanguage: appState.selectedLanguage)
                SoundboardView(selectedLanguage: appState.selectedLanguage)
                Spacer()
            }
            .padding()
            .overlay(
                Group {
                    if let message = appState.toastMessage {
                        ToastView(message: message, isError: appState.toastIsError)
                            .zIndex(1)
                    }
                }, alignment: .top
            )
        }
    }
}

#Preview {
    ContentView().environmentObject(AppState())
}
