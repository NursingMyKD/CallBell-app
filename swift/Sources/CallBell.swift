import Foundation

enum CallRequestType: String {
    case Water
    case Restroom
    case Reposition
    case Pain
    case General
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
