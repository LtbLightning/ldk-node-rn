import Foundation

@objc(LdkNodeRnModule)
class LdkNodeRnModule: NSObject {
    @objc
    func testFn(_
        wordCount: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        resolve("Returning from Native swift: " + wordCount)
    }
}

