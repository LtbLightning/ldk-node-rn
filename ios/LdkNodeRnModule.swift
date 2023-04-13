import Foundation

@objc(LdkNodeRnModule)
class LdkNodeRnModule: NSObject {

    var _configs: [String: Config] = [:]
    var _builders: [String: Builder] = [:]
    var _nodes: [String: Node] = [:]

    /** Config Methods starts */
    @objc
    func createConfig(_
        storageDirPath: String,
        esploraServerUrl: String,
        network: String,
        listeningAddress: String,
        defaultCltvExpiryDelta: NSNumber,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        let id = randomId()
        _configs[id] = Config(
            storageDirPath: storageDirPath,
            esploraServerUrl: esploraServerUrl,
            network: network,
            listeningAddress: nil,
            defaultCltvExpiryDelta: UInt32(truncating: defaultCltvExpiryDelta)
        )
        resolve(id)
    }
    /** Config Method ends */

    /** Builder Methods starts */
    @objc
    func fromConfig(_
        configId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        let id = randomId()
        _builders[id] = Builder.fromConfig(config: _configs[configId]!)
        resolve(id)
    }

    @objc
    func build(_
        builderId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        let id = randomId()
        _nodes[id] = _builders[builderId]!.build()
        resolve(id)
    }
    /** Builder Methods ends */

    /** Node methods starts */
    @objc
    func start(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        do {
            try _nodes[nodeId]!.start()
            resolve(true)
        } catch let error {
            reject("Node start error", "\(error)", error)
        }
    }
    
    @objc
    func nodeId(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        resolve(_nodes[nodeId]!.nodeId())
    }
    /** Node methods ends */


}

