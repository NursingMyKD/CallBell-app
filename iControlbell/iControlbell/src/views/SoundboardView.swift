// SoundboardView.swift
// Soundboard for speaking phrases

import SwiftUI
import AVFoundation

struct SoundboardView: View {
    var selectedLanguage: Language
    var categories: [SoundboardCategory]
    @State private var selectedCategoryIndex: Int = 0
    @State private var isSpeaking = false
    @State private var speechSynth = AVSpeechSynthesizer()
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("soundboard_title".localized)
                .font(.headline)
            Picker("Category", selection: $selectedCategoryIndex) {
                ForEach(0..<categories.count, id: \ .self) { idx in
                    Text(categories[idx].displayNames[selectedLanguage.rawValue] ?? "").tag(idx)
                }
            }
            .pickerStyle(SegmentedPickerStyle())
            if categories.indices.contains(selectedCategoryIndex) {
                let phrases = categories[selectedCategoryIndex].phrases[selectedLanguage.rawValue] ?? []
                LazyVGrid(columns: [GridItem(.adaptive(minimum: 120), spacing: 16)], spacing: 16) {
                    ForEach(phrases, id: \ .self) { phrase in
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
                        .accessibilityLabel(phrase)
                        .accessibilityAddTraits(.isButton)
                        .accessibilityHint("Double tap to speak phrase.")
                    }
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
