import XCTest
import CoreBluetooth
@testable import iControlbell

class BluetoothManagerTests: XCTestCase {
    func testBluetoothManagerInitialState() {
        let manager = BluetoothManager.shared
        XCTAssertFalse(manager.isConnected, "Bluetooth should not be connected initially")
        XCTAssertNil(manager.lastError, "No error should be present initially")
    }
    // Note: BLE hardware tests require a simulator or device and are best tested with UI automation.
}
