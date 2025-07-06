// SoundboardView.swift
// Soundboard for speaking phrases

import SwiftUI
import AVFoundation

struct SoundboardView: View {
    var selectedLanguage: Language
    @State private var selectedCategory: SoundboardCategory = .defaultCategory
    @State private var isSpeaking = false
    @State private var speechSynth = AVSpeechSynthesizer()
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Use localized section title if needed
            // Text(AppStrings.soundboardTitle(for: selectedLanguage))
            Text("Soundboard")
                .font(.headline)
            Picker("Category", selection: $selectedCategory) {
                ForEach(SoundboardCategory.allCases) { cat in
                    Text(cat.displayName).tag(cat)
                }
            }
            .pickerStyle(SegmentedPickerStyle())
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 120), spacing: 16)], spacing: 16) {
                ForEach(selectedCategory.phrases(for: selectedLanguage), id: \ .self) { phrase in
                    Button(action: {
                        speak(phrase)
                    }) {
                        VStack {
                            Image(systemName: "speaker.wave.2.fill")
                                .resizable()
                                .frame(width: 32, height: 32)
                                .padding(.bottom, 8)
                            Text(phrase)
                                .multilineTextAlignment(.center)
                        }
                        .padding()
                        .frame(maxWidth: .infinity, minHeight: 80)
                        .background(Color(.secondarySystemBackground))
                        .cornerRadius(16)
                        .shadow(radius: 2)
                    }
                    .accessibilityLabel(selectedCategory.accessibilityLabel(for: selectedLanguage, phrase: phrase))
                    .accessibilityAddTraits(.isButton)
                    .accessibilityHint("Double tap to speak phrase.")
                }
            }
        }
        .padding(.vertical)
    }
    
    func speak(_ phrase: String) {
        let utterance = AVSpeechUtterance(string: phrase)
        utterance.voice = AVSpeechSynthesisVoice(language: selectedLanguage.rawValue)
        speechSynth.speak(utterance)
    }
}

enum SoundboardCategory: String, CaseIterable, Identifiable {
    case greetings, needs, emotions
    var id: String { rawValue }
    var displayName: String {
        switch self {
        case .greetings: return "Greetings"
        case .needs: return "Needs"
        case .emotions: return "Emotions"
        }
    }
    func phrases(for lang: Language) -> [String] {
        switch self {
        case .greetings:
            switch lang {
            case .english: return ["Hello", "Good morning", "Good night"]
            case .spanish: return ["Hola", "Buenos días", "Buenas noches"]
            case .french: return ["Bonjour", "Bonsoir", "Bonne nuit"]
            }
        case .needs:
            switch lang {
            case .english: return ["I need help", "Water, please"]
            case .spanish: return ["Necesito ayuda", "Agua, por favor"]
            case .french: return ["J'ai besoin d'aide", "De l'eau, s'il vous plaît"]
            }
        case .emotions:
            switch lang {
            case .english: return ["I'm happy", "I'm sad"]
            case .spanish: return ["Estoy feliz", "Estoy triste"]
            case .french: return ["Je suis heureux", "Je suis triste"]
            }
        }
    }
    static var defaultCategory: SoundboardCategory { .greetings }
}

#Preview {
    SoundboardView(selectedLanguage: .english)
}
