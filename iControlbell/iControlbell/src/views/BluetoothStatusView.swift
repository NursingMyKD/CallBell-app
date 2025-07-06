// BluetoothStatusView.swift
// SwiftUI view to show Bluetooth connection status and allow triggering the call bell

import SwiftUI

struct BluetoothStatusView: View {
    @ObservedObject var bluetooth = BluetoothManager.shared
    
    var body: some View {
        VStack(spacing: 16) {
            HStack {
                Circle()
                    .fill(bluetooth.isConnected ? Color.green : Color.red)
                    .frame(width: 16, height: 16)
                Text(bluetooth.isConnected ? "Connected to Call Bell" : "Not Connected")
                    .accessibilityLabel(bluetooth.isConnected ? "Bluetooth connected to call bell system" : "Bluetooth not connected")
            }
            Button(action: {
                bluetooth.triggerCallBell()
            }) {
                Text("Trigger Call Bell")
                    .padding()
                    .background(Color.accentColor)
                    .foregroundColor(.white)
                    .cornerRadius(8)
            }
            .disabled(!bluetooth.isConnected)
            if let error = bluetooth.lastError {
                Text("Error: \(error)")
                    .foregroundColor(.red)
            }
        }
        .padding()
        .onAppear {
            bluetooth.startScanning()
        }
        .onDisappear {
            bluetooth.stopScanning()
        }
    }
}
