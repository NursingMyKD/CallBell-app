import XCTest
@testable import iControlbell

class PlistLoaderTests: XCTestCase {
    func testLoadCallRequestOptions() {
        let options: [CallRequestOption]? = PlistLoader.load("CallRequestOptions")
        XCTAssertNotNil(options, "CallRequestOptions.plist should load successfully")
        XCTAssertFalse(options?.isEmpty ?? true, "CallRequestOptions should not be empty")
    }
    
    func testLoadSoundboardCategories() {
        let categories: [SoundboardCategory]? = PlistLoader.load("SoundboardCategories")
        XCTAssertNotNil(categories, "SoundboardCategories.plist should load successfully")
        XCTAssertFalse(categories?.isEmpty ?? true, "SoundboardCategories should not be empty")
    }
}
