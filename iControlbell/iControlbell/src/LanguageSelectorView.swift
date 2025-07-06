// LanguageSelectorView.swift
// Language picker for iControlBell

import SwiftUI

struct LanguageSelectorView: View {
    @Binding var selectedLanguage: Language
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(AppStrings.languageSelectorLabel(for: selectedLanguage))
                .font(.headline)
            Picker(AppStrings.languageSelectorLabel(for: selectedLanguage), selection: $selectedLanguage) {
                ForEach(Language.allCases) { lang in
                    Text(lang.displayName).tag(lang)
                }
            }
            .pickerStyle(MenuPickerStyle())
            .accessibilityLabel(AppStrings.languageSelectorLabel(for: selectedLanguage))
            .accessibilityHint("Double tap to change language.")
        }
        .padding(.vertical)
    }
}

#Preview {
    LanguageSelectorView(selectedLanguage: .constant(.english))
}
