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
    func stop(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        do {
            try _nodes[nodeId]!.stop()
            resolve(true)
        } catch let error {
            reject("Node stop error", "\(error)", error)
        }
    }


    @objc
    func syncWallets(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        do {
            try _nodes[nodeId]!.syncWallets()
            resolve(true)
        } catch let error {
            reject("Node syncWallets error", "\(error)", error)
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

    @objc
    func newFundingAddress(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        do {
            resolve(try _nodes[nodeId]!.newFundingAddress())
        } catch let error {
            reject("Node newFundingAddress error", "\(error)", error)
        }
    }

    @objc
    func spendableOnchainBalanceSats(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        do {
            resolve(try _nodes[nodeId]!.spendableOnchainBalanceSats())
        } catch let error {
            reject("Node spendableOnchainBalanceSats error", "\(error)", error)
        }
    }

    @objc
    func totalOnchainBalanceSats(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        do {
            resolve(try _nodes[nodeId]!.totalOnchainBalanceSats())
        } catch let error {
            reject("Node totalOnchainBalanceSats error", "\(error)", error)
        }
    }


    @objc
    func connect(_
        nodeId: String,
        pubKey: String,
        address: String,
        permanently: Bool,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        do {
            try _nodes[nodeId]!.connect(nodeId: pubKey, address: address, permanently: permanently)
            resolve(true)
        } catch let error {
            reject("Node connect error", "\(error)", error)
        }
    }

    @objc
    func disconnect(_
        nodeId: String,
        pubKey: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        do {
            try _nodes[nodeId]!.disconnect(nodeId: pubKey)
            resolve(true)
        } catch let error {
            reject("Node disconnect error", "\(error)", error)
        }
    }

    @objc
    func connectOpenChannel(_
        nodeId: String,
        pubKey: String,
        address: String,
        channelAmountSats: NSNumber,
        pushToCounterpartyMsat: NSNumber,
        announceChannel: Bool,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        do {
            try _nodes[nodeId]!.connectOpenChannel(
                nodeId: pubKey,
                address: address,
                channelAmountSats: UInt64(truncating: channelAmountSats),
                pushToCounterpartyMsat: UInt64(truncating: pushToCounterpartyMsat),
                announceChannel: announceChannel
            )
            resolve(true)
        } catch let error {
            reject("Node open channel error", "\(error)", error)
        }
    }


    @objc
    func sendPayment(_
        nodeId: String,
        invoice: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        do {
            let invoice = try _nodes[nodeId]!.sendPayment(invoice: invoice)
            resolve(invoice)
        } catch let error {
            reject("Send payment invoice error", "\(error)", error)
        }
    }

    @objc
    func receivePayment(_
        nodeId: String,
        amountMsat: NSNumber,
        description: String,
        expirySecs: NSNumber,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        do {
            let invoice = try _nodes[nodeId]!.receivePayment(
                amountMsat: UInt64(truncating: amountMsat),
                description: description,
                expirySecs: UInt32(truncating: expirySecs)
            )
            resolve(invoice)
        } catch let error {
            reject("Receive payment invoice error", "\(error)", error)
        }
    }



    /** Node methods ends */


}

