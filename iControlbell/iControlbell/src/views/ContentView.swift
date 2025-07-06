// ContentView.swift
// Main Home Screen for iControlBell

import SwiftUI
import CoreBluetooth // Add this import for Bluetooth support
import BluetoothStatusView

struct ContentView: View {
    @EnvironmentObject var appState: AppState
    @StateObject private var soundboardData = SoundboardData(language: .english)
    @StateObject private var callRequestData = CallRequestData(language: .english)
    
    var body: some View {
        NavigationView {
            VStack(spacing: 24) {
                LogoView()
                    .accessibilityHidden(true)
                Text("app_title".localized)
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .accessibilityAddTraits(.isHeader)
                Text("app_description".localized)
                    .font(.title3)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal)
                LanguageSelectorView(selectedLanguage: $appState.selectedLanguage)
                CallRequestGridView(selectedLanguage: appState.selectedLanguage, callRequests: callRequestData.options)
                SoundboardView(selectedLanguage: appState.selectedLanguage, categories: soundboardData.categories)
                Spacer()
                BluetoothStatusView()
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

extension String {
    var localized: String { NSLocalizedString(self, comment: "") }
}

#Preview {
    ContentView().environmentObject(AppState())
}
