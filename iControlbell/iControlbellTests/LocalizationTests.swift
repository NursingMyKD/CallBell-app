import XCTest
@testable import iControlbell

class LocalizationTests: XCTestCase {
    func testLocalizedStringsExist() {
        let keys = ["app_title", "app_description", "language_selector_label", "soundboard_title", "call_request_grid_title"]
        for key in keys {
            let value = NSLocalizedString(key, comment: "")
            XCTAssertNotEqual(value, key, "Missing localization for \(key)")
        }
    }
}
