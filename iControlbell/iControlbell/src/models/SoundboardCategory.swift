// SoundboardCategory.swift
// Model for soundboard categories and phrases

import Foundation

struct SoundboardCategory: Identifiable, Hashable, Decodable {
    let id: String
    let displayNames: [String: String] // languageCode: displayName
    let phrases: [String: [String]] // languageCode: [phrases]
}

class SoundboardData: ObservableObject {
    @Published var categories: [SoundboardCategory] = []

    init(language: Language) {
        loadCategories(for: language)
    }

    func loadCategories(for language: Language) {
        if let loaded: [SoundboardCategory] = PlistLoader.load("SoundboardCategories") {
            self.categories = loaded
        }
    }
}
