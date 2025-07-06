// ToastView.swift
// Simple toast/notification overlay for user feedback

import SwiftUI

struct ToastView: View {
    let message: String
    let isError: Bool
    var body: some View {
        Text(message)
            .font(.headline)
            .foregroundColor(.white)
            .padding()
            .background(isError ? Color.red : Color.green)
            .cornerRadius(12)
            .shadow(radius: 8)
            .padding(.top, 40)
            .transition(.move(edge: .top).combined(with: .opacity))
            .accessibilityAddTraits(.isStaticText)
    }
}

#Preview {
    ToastView(message: "Request sent!", isError: false)
}
