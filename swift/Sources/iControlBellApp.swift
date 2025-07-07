// iControlBellApp.swift (Full Standalone Starter Project)

#if canImport(SwiftUI)
import SwiftUI
import AVFoundation

#if canImport(UIKit)
import UIKit
#endif

// MARK: - Models

enum LanguageCode: String, CaseIterable, Identifiable {
    case en, es, fr

    var id: String { rawValue }
    var displayName: String {
        switch self {
        case .en: return "English"
        case .es: return "Español"
        case .fr: return "Français"
        }
    }
    var speechLocale: String {
        switch self {
        case .en: return "en-US"
        case .es: return "es-ES"
        case .fr: return "fr-FR"
        }
    }
}

// MARK: - ViewModel

@MainActor
class AppViewModel: ObservableObject {
    @Published var selectedLanguage: LanguageCode = .en
    @Published var toast: ToastData?
    @Published var isPlayingSuccess: Bool = false

    private var player: AVAudioPlayer?
    private let speechSynthesizer = AVSpeechSynthesizer()

    func sendCallRequest(_ type: CallRequestType) {
        playSuccessSound()
        showToast(
            title: NSLocalizedString("Request Sent", comment: ""),
            description: String(format: NSLocalizedString("Your %@ request was sent.", comment: ""), type.localizedLabel)
        )
    }

    func playSuccessSound() {
        if player == nil {
            guard let url = Bundle.main.url(forResource: "success", withExtension: "mp3") else {
                return
            }
            do {
                player = try AVAudioPlayer(contentsOf: url)
                player?.prepareToPlay()
            } catch {
                print("Audio playback failed: \(error)")
                return
            }
        }

        player?.play()
        isPlayingSuccess = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            self.isPlayingSuccess = false
        }
    }

    func speak(_ text: String) {
        if speechSynthesizer.isSpeaking {
            speechSynthesizer.stopSpeaking(at: .immediate)
        }
        let utterance = AVSpeechUtterance(string: text)
        utterance.voice = AVSpeechSynthesisVoice(language: selectedLanguage.speechLocale)
        speechSynthesizer.speak(utterance)
    }

    func showToast(title: String, description: String) {
        toast = ToastData(title: title, description: description)
    }
}

struct ToastData: Identifiable, Equatable {
    let id = UUID()
    let title: String
    let description: String
    
    static func == (lhs: ToastData, rhs: ToastData) -> Bool {
        return lhs.id == rhs.id && lhs.title == rhs.title && lhs.description == rhs.description
    }
}

// MARK: - Views

struct MainView: View {
    @StateObject private var viewModel = AppViewModel()
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 28) {
                    LanguageSelector(selected: $viewModel.selectedLanguage)
                        .padding(.top)
                    Text("iControlBell")
                        .font(.largeTitle).fontWeight(.bold)
                    Text(NSLocalizedString("main_description", comment: ""))
                        .font(.title3)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                    CallRequestGrid(viewModel: viewModel)
                    Soundboard(viewModel: viewModel)
                }
                .padding()
                .background(Color.gray.opacity(0.1))
            }
            #if os(iOS)
            .navigationBarHidden(true)
            #endif
            .toast(data: $viewModel.toast)
        }
    }
}

struct CallRequestGrid: View {
    @ObservedObject var viewModel: AppViewModel
    /// Available requests excluding the generic placeholder.
    let requests = CallRequestType.allCases.filter { $0 != .general }

    var body: some View {
        VStack(spacing: 14) {
            ForEach(requests) { request in
                Button(action: {
                    viewModel.sendCallRequest(request)
                }) {
                    HStack(spacing: 16) {
                        Image(systemName: request.icon)
                            .resizable()
                            .scaledToFit()
                            .frame(width: 32, height: 32)
                            .foregroundColor(.white)
                        Text(request.localizedLabel)
                            .font(.title2)
                            .fontWeight(.semibold)
                            .foregroundColor(.white)
                    }
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(viewModel.isPlayingSuccess ? Color.green : Color.accentColor)
                    .cornerRadius(14)
                    .shadow(radius: 2)
                }
                .accessibilityLabel(
                    Text(
                        String(
                            format: NSLocalizedString("Send %@ request", comment: "VoiceOver label for call request button"),
                            request.localizedLabel
                        )
                    )
                )
                .disabled(viewModel.isPlayingSuccess)
            }
        }
        .padding(.vertical)
    }
}

struct Soundboard: View {
    @ObservedObject var viewModel: AppViewModel
    var phrases: [String] {
        [
            NSLocalizedString("Can you help me?", comment: ""),
            NSLocalizedString("I need to use the bathroom.", comment: ""),
            NSLocalizedString("I'm in pain.", comment: "")
        ]
    }

    var body: some View {
        VStack(spacing: 12) {
            Text(NSLocalizedString("soundboard_title", comment: ""))
                .font(.headline)
            HStack(spacing: 18) {
                ForEach(phrases, id: \.self) { phrase in
                    Button(action: {
                        viewModel.speak(phrase)
                    }) {
                        HStack {
                            Image(systemName: "speaker.wave.2.fill")
                            Text(phrase)
                                .font(.subheadline)
                        }
                        .padding(10)
                        .background(Color.secondary.opacity(0.1))
                        .cornerRadius(10)
                    }
                }
            }
        }
    }
}

struct LanguageSelector: View {
    @Binding var selected: LanguageCode

    var body: some View {
        Picker("Language", selection: $selected) {
            ForEach(LanguageCode.allCases) { lang in
                Text(lang.displayName).tag(lang)
            }
        }
        .pickerStyle(SegmentedPickerStyle())
        .padding(.horizontal)
    }
}

struct ToastView: View {
    let title: String
    let description: String
    var body: some View {
        VStack(spacing: 6) {
            Text(title).fontWeight(.bold)
            Text(description).font(.subheadline)
        }
        .padding()
        .background(Color.black.opacity(0.8))
        .foregroundColor(.white)
        .cornerRadius(14)
        .shadow(radius: 8)
        .transition(.move(edge: .top).combined(with: .opacity))
    }
}

extension View {
    func toast(data: Binding<ToastData?>) -> some View {
        ZStack {
            self
            if let toast = data.wrappedValue {
                VStack {
                    ToastView(title: toast.title, description: toast.description)
                        .padding(.top, 50)
                    Spacer()
                }
                .onAppear {
                    DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                        data.wrappedValue = nil
                    }
                }
                .animation(.easeInOut, value: data.wrappedValue)
            }
        }
    }
}

// MARK: - App Entry

@main
struct iControlBellApp: App {
    var body: some Scene {
        WindowGroup {
            MainView()
        }
    }
}
#endif
