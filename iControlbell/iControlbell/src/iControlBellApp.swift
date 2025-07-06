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
    case german = "de"
    case portuguese = "pt"
    case italian = "it"
    case japanese = "ja"
    case dutch = "nl"
    case russian = "ru"
    case chinese = "zh"
    case hindi = "hi"
    case arabic = "ar"
    case bengali = "bn"
    case korean = "ko"
    case turkish = "tr"
    case polish = "pl"
    case swedish = "sv"
    case vietnamese = "vi"
    case indonesian = "id"
    case urdu = "ur"
    case tagalog = "tl"
    case thai = "th"
    case greek = "el"
    case czech = "cs"
    case hungarian = "hu"
    case romanian = "ro"
    case danish = "da"
    case finnish = "fi"
    var id: String { rawValue }
    var displayName: String {
        switch self {
        case .english: return "English"
        case .spanish: return "Español"
        case .french: return "Français"
        case .german: return "Deutsch"
        case .portuguese: return "Português"
        case .italian: return "Italiano"
        case .japanese: return "日本語"
        case .dutch: return "Nederlands"
        case .russian: return "Русский"
        case .chinese: return "中文"
        case .hindi: return "हिन्दी"
        case .arabic: return "العربية"
        case .bengali: return "বাংলা"
        case .korean: return "한국어"
        case .turkish: return "Türkçe"
        case .polish: return "Polski"
        case .swedish: return "Svenska"
        case .vietnamese: return "Tiếng Việt"
        case .indonesian: return "Bahasa Indonesia"
        case .urdu: return "اردو"
        case .tagalog: return "Tagalog"
        case .thai: return "ภาษาไทย"
        case .greek: return "Ελληνικά"
        case .czech: return "Čeština"
        case .hungarian: return "Magyar"
        case .romanian: return "Română"
        case .danish: return "Dansk"
        case .finnish: return "Suomi"
        }
    }
}

// Localized app strings and soundboard phrases
struct AppStrings {
    static func title(for lang: Language) -> String {
        // All languages use the same app title
        return "iControlBell"
    }
    static func description(for lang: Language) -> String {
        switch lang {
        case .english: return "Eye-tracking accessible call bell app"
        case .spanish: return "Aplicación de timbre accesible por seguimiento ocular"
        case .french: return "Application de sonnette accessible par suivi oculaire"
        case .german: return "Barrierefreie Klingel-App mit Augensteuerung"
        case .portuguese: return "Aplicativo de campainha acessível por rastreamento ocular"
        case .italian: return "App campanello accessibile con controllo oculare"
        case .japanese: return "視線追跡対応の呼び鈴アプリ"
        case .dutch: return "Toegankelijke bel-app met oogbesturing"
        case .russian: return "Доступное приложение звонка с отслеживанием взгляда"
        case .chinese: return "支持眼动追踪的呼叫铃应用"
        case .hindi: return "आंखों की ट्रैकिंग से सुलभ कॉल बेल ऐप"
        case .arabic: return "تطبيق جرس نداء متاح بتتبع العين"
        case .bengali: return "চোখ ট্র্যাকিং সহ অ্যাক্সেসিবল কল বেল অ্যাপ"
        case .korean: return "시선 추적이 가능한 호출 벨 앱"
        case .turkish: return "Göz takibi ile erişilebilir çağrı zili uygulaması"
        case .polish: return "Dzwonek dostępny z kontrolą wzroku"
        case .swedish: return "Tillgänglig ringklocka med ögonspårning"
        case .vietnamese: return "Ứng dụng chuông gọi hỗ trợ theo dõi mắt"
        case .indonesian: return "Aplikasi bel panggilan aksesibel dengan pelacakan mata"
        case .urdu: return "آنکھوں کی ٹریکنگ کے ساتھ قابل رسائی کال بیل ایپ"
        case .tagalog: return "Accessible call bell app gamit ang eye-tracking"
        case .thai: return "แอปกริ่งเรียกที่เข้าถึงได้ด้วยการติดตามดวงตา"
        case .greek: return "Προσβάσιμη εφαρμογή κουδουνιού με παρακολούθηση ματιών"
        case .czech: return "Přístupný zvonek s očním sledováním"
        case .hungarian: return "Akadálymentes csengő alkalmazás szemkövetéssel"
        case .romanian: return "Aplicație de sonerie accesibilă cu urmărire oculară"
        case .danish: return "Tilgængelig ringeklokke-app med øjensporing"
        case .finnish: return "Esteetön soittokello silmänseurannalla"
        }
    }
    static func languageSelectorLabel(for lang: Language) -> String {
        switch lang {
        case .english: return "Select Language"
        case .spanish: return "Seleccionar idioma"
        case .french: return "Choisir la langue"
        case .german: return "Sprache wählen"
        case .portuguese: return "Selecionar idioma"
        case .italian: return "Seleziona lingua"
        case .japanese: return "言語を選択"
        case .dutch: return "Selecteer taal"
        case .russian: return "Выберите язык"
        case .chinese: return "选择语言"
        case .hindi: return "भाषा चुनें"
        case .arabic: return "اختر اللغة"
        case .bengali: return "ভাষা নির্বাচন করুন"
        case .korean: return "언어 선택"
        case .turkish: return "Dil seçin"
        case .polish: return "Wybierz język"
        case .swedish: return "Välj språk"
        case .vietnamese: return "Chọn ngôn ngữ"
        case .indonesian: return "Pilih bahasa"
        case .urdu: return "زبان منتخب کریں"
        case .tagalog: return "Pumili ng wika"
        case .thai: return "เลือกภาษา"
        case .greek: return "Επιλέξτε γλώσσα"
        case .czech: return "Vyberte jazyk"
        case .hungarian: return "Válasszon nyelvet"
        case .romanian: return "Selectați limba"
        case .danish: return "Vælg sprog"
        case .finnish: return "Valitse kieli"
        }
    }
}

struct SoundboardCategory: Identifiable, Hashable {
    let id: String
    let displayName: [Language: String]
    let phrases: [Language: [String]]
}

extension SoundboardCategory {
    private static func placeholderPhrases(for category: String, lang: Language) -> [String] {
        // You can replace these with real translations later
        return (1...25).map { "\(category.capitalized) Phrase \($0) [\(lang.displayName)]" }
    }
    static let greetings = SoundboardCategory(
        id: "greetings",
        displayName: Language.allCases.reduce(into: [Language: String]()) { dict, lang in
            switch lang {
            case .english: dict[.english] = "Greetings"
            case .spanish: dict[.spanish] = "Saludos"
            case .french: dict[.french] = "Salutations"
            case .german: dict[.german] = "Begrüßungen"
            case .portuguese: dict[.portuguese] = "Saudações"
            case .italian: dict[.italian] = "Saluti"
            case .japanese: dict[.japanese] = "挨拶"
            case .dutch: dict[.dutch] = "Groeten"
            case .russian: dict[.russian] = "Приветствия"
            case .chinese: dict[.chinese] = "问候"
            case .hindi: dict[.hindi] = "अभिवादन"
            case .arabic: dict[.arabic] = "تحيات"
            case .bengali: dict[.bengali] = "অভিবাদন"
            case .korean: dict[.korean] = "인사"
            case .turkish: dict[.turkish] = "Selamlar"
            case .polish: dict[.polish] = "Pozdrowienia"
            case .swedish: dict[.swedish] = "Hälsningar"
            case .vietnamese: dict[.vietnamese] = "Lời chào"
            case .indonesian: dict[.indonesian] = "Salam"
            case .urdu: dict[.urdu] = "سلام"
            case .tagalog: dict[.tagalog] = "Pagbati"
            case .thai: dict[.thai] = "คำทักทาย"
            case .greek: dict[.greek] = "Χαιρετισμοί"
            case .czech: dict[.czech] = "Pozdravy"
            case .hungarian: dict[.hungarian] = "Köszöntések"
            case .romanian: dict[.romanian] = "Salutări"
            case .danish: dict[.danish] = "Hilsner"
            case .finnish: dict[.finnish] = "Tervehdykset"
            }
        },
        phrases: Language.allCases.reduce(into: [Language: [String]]()) { dict, lang in
            dict[lang] = placeholderPhrases(for: "greetings", lang: lang)
        }
    )
    static let needs = SoundboardCategory(
        id: "needs",
        displayName: Language.allCases.reduce(into: [Language: String]()) { dict, lang in
            switch lang {
            case .english: dict[.english] = "Needs"
            case .spanish: dict[.spanish] = "Necesidades"
            case .french: dict[.french] = "Besoins"
            case .german: dict[.german] = "Bedürfnisse"
            case .portuguese: dict[.portuguese] = "Necessidades"
            case .italian: dict[.italian] = "Bisogni"
            case .japanese: dict[.japanese] = "必要"
            case .dutch: dict[.dutch] = "Behoeften"
            case .russian: dict[.russian] = "Потребности"
            case .chinese: dict[.chinese] = "需求"
            case .hindi: dict[.hindi] = "जरूरतें"
            case .arabic: dict[.arabic] = "احتياجات"
            case .bengali: dict[.bengali] = "প্রয়োজন"
            case .korean: dict[.korean] = "필요"
            case .turkish: dict[.turkish] = "İhtiyaçlar"
            case .polish: dict[.polish] = "Potrzeby"
            case .swedish: dict[.swedish] = "Behov"
            case .vietnamese: dict[.vietnamese] = "Nhu cầu"
            case .indonesian: dict[.indonesian] = "Kebutuhan"
            case .urdu: dict[.urdu] = "ضرورتیں"
            case .tagalog: dict[.tagalog] = "Pangangailangan"
            case .thai: dict[.thai] = "ความต้องการ"
            case .greek: dict[.greek] = "Ανάγκες"
            case .czech: dict[.czech] = "Potřeby"
            case .hungarian: dict[.hungarian] = "Szükségletek"
            case .romanian: dict[.romanian] = "Nevoi"
            case .danish: dict[.danish] = "Behov"
            case .finnish: dict[.finnish] = "Tarpeet"
            }
        },
        phrases: Language.allCases.reduce(into: [Language: [String]]()) { dict, lang in
            dict[lang] = placeholderPhrases(for: "needs", lang: lang)
        }
    )
    static let comfort = SoundboardCategory(
        id: "comfort",
        displayName: Language.allCases.reduce(into: [Language: String]()) { dict, lang in
            switch lang {
            case .english: dict[.english] = "Comfort"
            case .spanish: dict[.spanish] = "Consuelo"
            case .french: dict[.french] = "Confort"
            case .german: dict[.german] = "Komfort"
            case .portuguese: dict[.portuguese] = "Conforto"
            case .italian: dict[.italian] = "Comfort"
            case .japanese: dict[.japanese] = "快適さ"
            case .dutch: dict[.dutch] = "Comfort"
            case .russian: dict[.russian] = "Комфорт"
            case .chinese: dict[.chinese] = "舒适"
            case .hindi: dict[.hindi] = "आराम"
            case .arabic: dict[.arabic] = "راحة"
            case .bengali: dict[.bengali] = "সান্ত্বনা"
            case .korean: dict[.korean] = "편안함"
            case .turkish: dict[.turkish] = "Rahatlık"
            case .polish: dict[.polish] = "Komfort"
            case .swedish: dict[.swedish] = "Komfort"
            case .vietnamese: dict[.vietnamese] = "Thoải mái"
            case .indonesian: dict[.indonesian] = "Kenyamanan"
            case .urdu: dict[.urdu] = "آرام"
            case .tagalog: dict[.tagalog] = "Ginhawa"
            case .thai: dict[.thai] = "ความสบาย"
            case .greek: dict[.greek] = "Άνεση"
            case .czech: dict[.czech] = "Pohodlí"
            case .hungarian: dict[.hungarian] = "Kényelem"
            case .romanian: dict[.romanian] = "Confort"
            case .danish: dict[.danish] = "Komfort"
            case .finnish: dict[.finnish] = "Mukavuus"
            }
        },
        phrases: Language.allCases.reduce(into: [Language: [String]]()) { dict, lang in
            dict[lang] = placeholderPhrases(for: "comfort", lang: lang)
        }
    )
    static let feelings = SoundboardCategory(
        id: "feelings",
        displayName: Language.allCases.reduce(into: [Language: String]()) { dict, lang in
            switch lang {
            case .english: dict[.english] = "Feelings"
            case .spanish: dict[.spanish] = "Sentimientos"
            case .french: dict[.french] = "Sentiments"
            case .german: dict[.german] = "Gefühle"
            case .portuguese: dict[.portuguese] = "Sentimentos"
            case .italian: dict[.italian] = "Sentimenti"
            case .japanese: dict[.japanese] = "気持ち"
            case .dutch: dict[.dutch] = "Gevoelens"
            case .russian: dict[.russian] = "Чувства"
            case .chinese: dict[.chinese] = "感情"
            case .hindi: dict[.hindi] = "भावनाएँ"
            case .arabic: dict[.arabic] = "مشاعر"
            case .bengali: dict[.bengali] = "অনুভূতি"
            case .korean: dict[.korean] = "감정"
            case .turkish: dict[.turkish] = "Duygular"
            case .polish: dict[.polish] = "Uczucia"
            case .swedish: dict[.swedish] = "Känslor"
            case .vietnamese: dict[.vietnamese] = "Cảm xúc"
            case .indonesian: dict[.indonesian] = "Perasaan"
            case .urdu: dict[.urdu] = "احساسات"
            case .tagalog: dict[.tagalog] = "Damdamin"
            case .thai: dict[.thai] = "ความรู้สึก"
            case .greek: dict[.greek] = "Συναισθήματα"
            case .czech: dict[.czech] = "Pocity"
            case .hungarian: dict[.hungarian] = "Érzések"
            case .romanian: dict[.romanian] = "Sentimente"
            case .danish: dict[.danish] = "Følelser"
            case .finnish: dict[.finnish] = "Tunteet"
            }
        },
        phrases: Language.allCases.reduce(into: [Language: [String]]()) { dict, lang in
            dict[lang] = placeholderPhrases(for: "feelings", lang: lang)
        }
    )
    static let responses = SoundboardCategory(
        id: "responses",
        displayName: Language.allCases.reduce(into: [Language: String]()) { dict, lang in
            switch lang {
            case .english: dict[.english] = "Responses"
            case .spanish: dict[.spanish] = "Respuestas"
            case .french: dict[.french] = "Réponses"
            case .german: dict[.german] = "Antworten"
            case .portuguese: dict[.portuguese] = "Respostas"
            case .italian: dict[.italian] = "Risposte"
            case .japanese: dict[.japanese] = "返事"
            case .dutch: dict[.dutch] = "Antwoorden"
            case .russian: dict[.russian] = "Ответы"
            case .chinese: dict[.chinese] = "回答"
            case .hindi: dict[.hindi] = "जवाब"
            case .arabic: dict[.arabic] = "ردود"
            case .bengali: dict[.bengali] = "প্রতিক্রিয়া"
            case .korean: dict[.korean] = "응답"
            case .turkish: dict[.turkish] = "Yanıtlar"
            case .polish: dict[.polish] = "Odpowiedzi"
            case .swedish: dict[.swedish] = "Svar"
            case .vietnamese: dict[.vietnamese] = "Phản hồi"
            case .indonesian: dict[.indonesian] = "Tanggapan"
            case .urdu: dict[.urdu] = "جوابات"
            case .tagalog: dict[.tagalog] = "Mga tugon"
            case .thai: dict[.thai] = "การตอบกลับ"
            case .greek: dict[.greek] = "Απαντήσεις"
            case .czech: dict[.czech] = "Odpovědi"
            case .hungarian: dict[.hungarian] = "Válaszok"
            case .romanian: dict[.romanian] = "Răspunsuri"
            case .danish: dict[.danish] = "Svar"
            case .finnish: dict[.finnish] = "Vastaukset"
            }
        },
        phrases: Language.allCases.reduce(into: [Language: [String]]()) { dict, lang in
            dict[lang] = placeholderPhrases(for: "responses", lang: lang)
        }
    )
    static let all: [SoundboardCategory] = [.greetings, .needs, .comfort, .feelings, .responses]
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
