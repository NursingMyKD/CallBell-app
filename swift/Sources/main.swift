import Foundation

@main
struct Main {
    static func main() async {
        let result = await handleCallBellTrigger(requestType: .General)
        switch result {
        case .success(let status):
            print("Success: call bell active \(status.isCallBellActive)")
        case .failure(let error):
            print("Error: \(error.localizedDescription)")
        }
    }
}
