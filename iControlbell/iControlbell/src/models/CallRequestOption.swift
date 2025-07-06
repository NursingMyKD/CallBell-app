// CallRequestOption.swift
// Model for call request options

import Foundation

struct CallRequestOption: Identifiable, Decodable {
    let id = UUID()
    let type: String
    let iconName: String
    let labels: [String: String] // languageCode: label
}

class CallRequestData: ObservableObject {
    @Published var options: [CallRequestOption] = []

    init(language: Language) {
        loadOptions(for: language)
    }

    func loadOptions(for language: Language) {
        if let loaded: [CallRequestOption] = PlistLoader.load("CallRequestOptions") {
            self.options = loaded
        }
    }
}
