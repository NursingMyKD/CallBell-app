import Foundation

struct PlistLoader {
    static func load<T: Decodable>(_ filename: String) -> T? {
        guard let url = Bundle.main.url(forResource: filename, withExtension: "plist"),
              let data = try? Data(contentsOf: url) else {
            return nil
        }
        let decoder = PropertyListDecoder()
        return try? decoder.decode(T.self, from: data)
    }
}
