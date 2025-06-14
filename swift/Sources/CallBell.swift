import Foundation
import FirebaseFirestoreSwift // Added import

// MARK: - Call Request Entry Struct
struct CallRequestEntry: Codable {
    @DocumentID var id: String?
    var requestType: String
    var timestamp: Timestamp
    var userId: String? = nil // Optional user ID for future use
}

/// Represents the different assistance requests a patient can trigger.
enum CallRequestType: String, CaseIterable, Identifiable {
    case pain
    case bathroom
    case water
    case reposition
    case emergency
    case general

    var id: String { rawValue }

    /// SF Symbol name used when displaying the request in a SwiftUI view.
    var icon: String {
        switch self {
        case .pain: return "bandage.fill"
        case .bathroom: return "toilet.fill"
        case .water: return "drop.fill"
        case .reposition: return "arrow.triangle.2.circlepath"
        case .emergency: return "exclamationmark.triangle.fill"
        case .general: return "bell.fill"
        }
    }

    /// Localized label describing the request.
    var localizedLabel: String {
        NSLocalizedString(rawValue, comment: "")
    }
}

struct CallBellStatus {
    var isCallBellActive: Bool
    var requestType: CallRequestType?
    var message: String?
}

func triggerCallBell(requestType: CallRequestType) async throws -> CallBellStatus {
    let db = Firestore.firestore()
    let newCallRequestEntry = CallRequestEntry(
        requestType: requestType.rawValue,
        timestamp: Timestamp(date: Date()),
        userId: nil // Set to nil for now
    )

    do {
        let newRequestRef = try db.collection("callRequests").addDocument(from: newCallRequestEntry)
        // Successfully added
        return CallBellStatus(
            isCallBellActive: true, // Kept as true for now
            requestType: requestType,
            message: "Request for \(requestType.localizedLabel) successfully sent and logged with ID: \(newRequestRef.documentID)."
        )
    } catch {
        // Re-throw the error to be caught by handleCallBellTrigger
        throw error
    }
}

@discardableResult
func handleCallBellTrigger(requestType: CallRequestType) async -> Result<CallBellStatus, Error> {
    do {
        let status = try await triggerCallBell(requestType: requestType)
        return .success(status)
    } catch {
        return .failure(error)
    }
}
