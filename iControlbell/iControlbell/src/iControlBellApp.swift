// iControlBellApp.swift
// Main entry point for the iOS app using SwiftUI

import SwiftUI

@main
struct iControlBellApp: App {
    @StateObject private var appState = AppState()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appState)
        }
    }
}

// App-wide state management
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

// Supported languages (expand as needed)
enum Language: String, CaseIterable, Identifiable {
    case english = "en"
    case spanish = "es"
    case french = "fr"
    // ... add more
    var id: String { rawValue }
    var displayName: String {
        switch self {
        case .english: return "English"
        case .spanish: return "Español"
        case .french: return "Français"
        // ...
        }
    }
}

// Localized app strings and soundboard phrases
struct AppStrings {
    static func title(for lang: Language) -> String {
        switch lang {
        case .english: return "iControlBell"
        case .spanish: return "iControlBell"
        case .french: return "iControlBell"
        }
    }
    static func description(for lang: Language) -> String {
        switch lang {
        case .english: return "Eye-tracking accessible call bell app"
        case .spanish: return "Aplicación de timbre accesible por seguimiento ocular"
        case .french: return "Application de sonnette accessible par suivi oculaire"
        }
    }
    static func languageSelectorLabel(for lang: Language) -> String {
        switch lang {
        case .english: return "Select Language"
        case .spanish: return "Seleccionar idioma"
        case .french: return "Choisir la langue"
        }
    }
}

struct SoundboardCategory: Identifiable, Hashable {
    let id: String
    let displayName: [Language: String]
    let phrases: [Language: [String]]
}

extension SoundboardCategory {
    static let greetings = SoundboardCategory(
        id: "greetings",
        displayName: [
            .english: "Greetings",
            .spanish: "Saludos",
            .french: "Salutations"
        ],
        phrases: [
            .english: ["Hello", "Good morning", "Good night"],
            .spanish: ["Hola", "Buenos días", "Buenas noches"],
            .french: ["Bonjour", "Bonsoir", "Bonne nuit"]
        ]
    )
    static let needs = SoundboardCategory(
        id: "needs",
        displayName: [
            .english: "Needs",
            .spanish: "Necesidades",
            .french: "Besoins"
        ],
        phrases: [
            .english: ["I need help", "Water, please"],
            .spanish: ["Necesito ayuda", "Agua, por favor"],
            .french: ["J'ai besoin d'aide", "De l'eau, s'il vous plaît"]
        ]
    )
    static let emotions = SoundboardCategory(
        id: "emotions",
        displayName: [
            .english: "Emotions",
            .spanish: "Emociones",
            .french: "Émotions"
        ],
        phrases: [
            .english: ["I'm happy", "I'm sad"],
            .spanish: ["Estoy feliz", "Estoy triste"],
            .french: ["Je suis heureux", "Je suis triste"]
        ]
    )
    static let all: [SoundboardCategory] = [.greetings, .needs, .emotions]
}

struct CallRequestOption: Identifiable {
    let id = UUID()
    let type: String
    let iconName: String
    let labels: [Language: String]
    // Accessibility label for VoiceOver
    func accessibilityLabel(for lang: Language) -> String {
        switch type {
        case "help":
            switch lang {
            case .english: return "Request help"
            case .spanish: return "Solicitar ayuda"
            case .french: return "Demander de l'aide"
            }
        case "water":
            switch lang {
            case .english: return "Request water"
            case .spanish: return "Pedir agua"
            case .french: return "Demander de l'eau"
            }
        default:
            return label(for: lang)
        }
    }
    func label(for lang: Language) -> String {
        labels[lang] ?? type
    }
    static let defaultOptions: [CallRequestOption] = [
        CallRequestOption(type: "help", iconName: "bell.fill", labels: [.english: "Help", .spanish: "Ayuda", .french: "Aide"]),
        CallRequestOption(type: "water", iconName: "drop.fill", labels: [.english: "Water", .spanish: "Agua", .french: "Eau"]),
        // ...add more options
    ]
}

extension SoundboardCategory {
    // Accessibility label for VoiceOver
    func accessibilityLabel(for lang: Language, phrase: String) -> String {
        switch id {
        case "greetings":
            switch lang {
            case .english: return "Greeting: \(phrase)"
            case .spanish: return "Saludo: \(phrase)"
            case .french: return "Salutation: \(phrase)"
            }
        case "needs":
            switch lang {
            case .english: return "Need: \(phrase)"
            case .spanish: return "Necesidad: \(phrase)"
            case .french: return "Besoin: \(phrase)"
            }
        case "emotions":
            switch lang {
            case .english: return "Emotion: \(phrase)"
            case .spanish: return "Emoción: \(phrase)"
            case .french: return "Émotion: \(phrase)"
            }
        default:
            return phrase
        }
    }
}
