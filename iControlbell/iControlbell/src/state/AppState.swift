// AppState.swift
// Global app state for iControlBell

import SwiftUI

class AppState: ObservableObject {
    @Published var selectedLanguage: Language = .english
    @Published var toastMessage: String? = nil
    @Published var toastIsError: Bool = false
    func showToast(_ message: String, isError: Bool = false) {
        toastMessage = message
        toastIsError = isError
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            self.toastMessage = nil
        }
    }
}
