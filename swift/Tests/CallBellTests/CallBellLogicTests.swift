import XCTest
@testable import iControlBellApp // The module name is derived from the package name
import FirebaseFirestore // Required for the Timestamp type

class CallBellLogicTests: XCTestCase {

    func testCallRequestEntryCreation() {
        let requestType = CallRequestType.water
        let testDate = Date() // Use a fixed date for consistent Timestamp creation

        // Create the CallRequestEntry
        let entry = CallRequestEntry(
            id: nil, // id is usually populated by Firestore or nil before saving
            requestType: requestType.rawValue,
            timestamp: Timestamp(date: testDate), // Use Firestore's Timestamp
            userId: "testUser123"
        )

        XCTAssertEqual(entry.requestType, "water")
        XCTAssertNotNil(entry.timestamp)
        // Firestore Timestamp conversion might have minor precision differences.
        // Compare components or timeIntervalSince1970 for more robust checks if needed.
        XCTAssertEqual(entry.timestamp.dateValue().timeIntervalSince1970, testDate.timeIntervalSince1970, accuracy: 0.001)
        XCTAssertEqual(entry.userId, "testUser123")
        XCTAssertNil(entry.id) // id should be nil initially
    }

    func testCallBellStatusCreation() {
        let requestType = CallRequestType.emergency
        let message = "Test successful for emergency"
        let status = CallBellStatus(isCallBellActive: true, requestType: requestType, message: message)

        XCTAssertTrue(status.isCallBellActive)
        XCTAssertEqual(status.requestType, .emergency)
        XCTAssertEqual(status.message, message)
    }

    // Note: Testing the `triggerCallBell` function directly is more complex due to its
    // direct dependency on Firestore's `addDocument` method. This would typically require:
    // 1. Mocking Firestore: Abstracting Firestore operations behind a protocol and using a
    //    mock implementation in tests.
    // 2. Live Firestore (Integration Test): Running tests against a real (test) Firestore
    //    database, which is slower and requires careful setup/teardown and network access.
    // The current tests focus on the synchronous logic and data structures within CallBell.swift.
}
