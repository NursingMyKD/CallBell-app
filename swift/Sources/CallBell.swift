import Foundation

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
    // TODO: Replace with actual API call to the hospital call bell system
    print("Call bell triggered for request: \(requestType.rawValue)")
    return CallBellStatus(
        isCallBellActive: true,
        requestType: requestType,
        message: "Assistance for \(requestType.rawValue) has been requested."
    )
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
