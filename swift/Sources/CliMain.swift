import Foundation

// @main - commented out to avoid conflict with SwiftUI app
struct Main {
    static func main() async {
        let result = await handleCallBellTrigger(requestType: .general)
        switch result {
        case .success(let status):
            print("Success: call bell active \(status.isCallBellActive)")
        case .failure(let error):
            print("Error: \(error.localizedDescription)")
        }
    }
}
