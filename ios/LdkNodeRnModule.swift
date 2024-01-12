import Foundation

@objc(LdkNodeRnModule)
class LdkNodeRnModule: NSObject {

    var _configs: [String: Config] = [:]
    var _builders: [String: Builder] = [:]
    var _nodes: [String: LdkNode] = [:]

    /** Config Methods starts */
    @objc
    func createConfig(_
        storageDirPath: String,
        logDirPath: String?,
        network: String,
        listeningAddresses: NSArray,
        defaultCltvExpiryDelta: NSNumber? = 144,
        onchainWalletSyncIntervalSecs: NSNumber? = 80,
        walletSyncIntervalSecs: NSNumber? = 30,
        feeRateCacheUpdateIntervalSecs: NSNumber? = 600,
        trustedPeers0conf: NSArray,
        probingLiquidityLimitMultiplier: NSNumber? = 3,
        logLevel: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        let addresses = listeningAddresses as! [SocketAddress]
        DispatchQueue.main.async { [self] in
            let id = randomId()
            _configs[id] = Config(
                storageDirPath: storageDirPath,
                logDirPath: logDirPath,
                network: getNetworkEnum(networkStr: network),
                listeningAddresses: addresses,
                defaultCltvExpiryDelta: UInt32(truncating: defaultCltvExpiryDelta!),
                onchainWalletSyncIntervalSecs: UInt64(truncating: onchainWalletSyncIntervalSecs!),
                walletSyncIntervalSecs: UInt64(truncating: walletSyncIntervalSecs!),
                feeRateCacheUpdateIntervalSecs: UInt64(truncating: feeRateCacheUpdateIntervalSecs!),
                trustedPeers0conf: trustedPeers0conf as! [PublicKey],
                probingLiquidityLimitMultiplier: UInt64(truncating: probingLiquidityLimitMultiplier!),
                logLevel: getLogLevelEnum(logLevel: logLevel)
            )
            resolve(id)
        }
    }
    /** Config Method ends */

    /** Builder Methods starts */
    @objc
    func fromConfig(_
        configId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            let id = randomId()
            _builders[id] = Builder.fromConfig(config: _configs[configId]!)
            resolve(id)
        }
    }

    @objc
    func setEntropySeedPath(_
        builderId: String,
        seedPath: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            _builders[builderId]!.setEntropySeedPath(seedPath: seedPath)
            resolve(true)
        }
    }

    @objc
    func setEntropySeedBytes(_
        builderId: String,
        seedBytes: NSArray,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                try _builders[builderId]!.setEntropySeedBytes(seedBytes: getNatieBytes(list: seedBytes))
                resolve(true)
            } catch let error {
                reject("Set entropy seed bytes array", "\(error)", error)
            }
        }
    }

    @objc
    func setEntropyBip39Mnemonic(_
        builderId: String,
        mnemonic: String,
        passphrase: String?,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            _builders[builderId]!.setEntropyBip39Mnemonic(mnemonic: mnemonic, passphrase: passphrase)
            resolve(true)
        }
    }

    @objc
    func setEsploraServer(_
        builderId: String,
        esploraServerUrl: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            _builders[builderId]!.setEsploraServer(esploraServerUrl: esploraServerUrl)
            resolve(true)
        }
    }

    @objc
    func setGossipSourceP2p(_
        builderId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            _builders[builderId]!.setGossipSourceP2p()
            resolve(true)
        }
    }

    @objc
    func setGossipSourceRgs(_
        builderId: String,
        rgsServerUrl: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            _builders[builderId]!.setGossipSourceRgs(rgsServerUrl: rgsServerUrl)
            resolve(true)
        }
    }

    @objc
    func setStorageDirPath(_
        builderId: String,
        storageDirPath: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            _builders[builderId]!.setStorageDirPath(storageDirPath: storageDirPath)
            resolve(true)
        }
    }

    @objc
    func setNetwork(_
        builderId: String,
        network: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            _builders[builderId]!.setNetwork(network: getNetworkEnum(networkStr: network))
            resolve(true)
        }
    }

    @objc
    func setListeningAddresses(_
        builderId: String,
        listeningAddresses: NSArray,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            try! _builders[builderId]!.setListeningAddresses(listeningAddresses: listeningAddresses as! [SocketAddress])
            resolve(true)
        }
    }

    @objc
    func build(_
        builderId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                let id = randomId()
                _nodes[id] = try _builders[builderId]!.build()
                resolve(id)
            } catch let error {
                reject("Node build error", "\(error)", error)
            }
        }
    }
    /** Builder Methods ends */

    /** Node methods starts */
    @objc
    func start(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                try _nodes[nodeId]!.start()
                resolve(true)
            } catch let error {
                reject("Node start error", "\(error)", error)
            }
        }
    }

    @objc
    func stop(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                try _nodes[nodeId]!.stop()
                resolve(true)
            } catch let error {
                reject("Node stop error", "\(error)", error)
            }
        }
    }


    @objc
    func syncWallets(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                try _nodes[nodeId]!.syncWallets()
                resolve(true)
            } catch let error {
                reject("Node syncWallets error", "\(error)", error)
            }
        }
    }


    @objc
    func nodeId(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            resolve(_nodes[nodeId]!.nodeId())
        }
    }
    
    @objc
    func listeningAddresses(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            resolve(_nodes[nodeId]!.listeningAddresses())
        }
    }

    @objc
    func newOnchainAddress(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                resolve(try _nodes[nodeId]!.newOnchainAddress())
            } catch let error {
                reject("Node newOnchainAddress error", "\(error)", error)
            }
        }
    }

    @objc
    func sendToOnchainAddress(_
        nodeId: String,
        address: String,
        amountMsat: NSNumber, 
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                resolve(try _nodes[nodeId]!.sendToOnchainAddress(address: address, amountMsat: UInt64(truncating: amountMsat)))
            } catch let error {
                reject("Node sendToOnchainAddress error", "\(error)", error)
            }
        }
    }

    @objc
    func sendAllToOnchainAddress(_
        nodeId: String,
        address: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                resolve(try _nodes[nodeId]!.sendAllToOnchainAddress(address: address))
            } catch let error {
                reject("Node sendAllToOnchainAddress error", "\(error)", error)
            }
        }
    }


    @objc
    func spendableOnchainBalanceSats(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                resolve(try _nodes[nodeId]!.spendableOnchainBalanceSats())
            } catch let error {
                reject("Node spendableOnchainBalanceSats error", "\(error)", error)
            }
        }
    }

    @objc
    func totalOnchainBalanceSats(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                resolve(try _nodes[nodeId]!.totalOnchainBalanceSats())
            } catch let error {
                reject("Node totalOnchainBalanceSats error", "\(error)", error)
            }
        }
    }


    @objc
    func connect(_
        nodeId: String,
        pubKey: String,
        address: String,
        persist: Bool,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                try _nodes[nodeId]!.connect(nodeId: pubKey, address: address, persist: persist)
                resolve(true)
            } catch let error {
                reject("Node connect error", "\(error)", error)
            }
        }
    }

    @objc
    func disconnect(_
        nodeId: String,
        pubKey: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                try _nodes[nodeId]!.disconnect(nodeId: pubKey)
                resolve(true)
            } catch let error {
                reject("Node disconnect error", "\(error)", error)
            }
        }
    }

    @objc
    func connectOpenChannel(_
        nodeId: String,
        pubKey: String,
        address: String,
        channelAmountSats: NSNumber,
        pushToCounterpartyMsat: NSNumber,
        channelConfig: Any? = nil,
        announceChannel: Bool,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                var config: ChannelConfig? = nil
                if channelConfig != nil {
                    config = createChannelConfig(config: channelConfig as! NSDictionary)
                }
                try _nodes[nodeId]!.connectOpenChannel(
                    nodeId: pubKey,
                    address: address,
                    channelAmountSats: UInt64(truncating: channelAmountSats),
                    pushToCounterpartyMsat: UInt64(truncating: pushToCounterpartyMsat),
                    channelConfig: config,
                    announceChannel: announceChannel
                )
                resolve(true)
            } catch let error {
                reject("Node open channel error", "\(error)", error)
            }
        }
    }

    @objc
    func closeChannel(_
        nodeId: String,
        channelId: String,
        counterpartyNodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                try _nodes[nodeId]!.closeChannel(channelId: channelId, counterpartyNodeId: counterpartyNodeId)
                resolve(true)
            } catch let error {
                reject("Node close channel error", "\(error)", error)
            }
        }
    }


    @objc
    func sendPayment(_
        nodeId: String,
        invoice: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                let invoice = try _nodes[nodeId]!.sendPayment(invoice: invoice)
                resolve(invoice)
            } catch let error {
                reject("Send payment invoice error", "\(error)", error)
            }
        }
    }

    @objc
    func sendPaymentUsingAmount(_
        nodeId: String,
        invoice: String,
        amountMsat: NSNumber,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                let invoice = try _nodes[nodeId]!.sendPaymentUsingAmount(invoice: invoice, amountMsat: UInt64(truncating: amountMsat))
                resolve(invoice)
            } catch let error {
                reject("Send payment using amount invoice error", "\(error)", error)
            }
        }
    }

    @objc
    func sendSpontaneousPayment(_
        nodeId: String,
        amountMsat: NSNumber,
        pubKey: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                let invoice = try _nodes[nodeId]!.sendSpontaneousPayment(amountMsat: UInt64(truncating: amountMsat), nodeId: pubKey)
                resolve(invoice)
            } catch let error {
                reject("Send spontaneous payment error", "\(error)", error)
            }
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
        DispatchQueue.main.async { [self] in
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
    }

    @objc
    func receiveVariableAmountPayment(_
        nodeId: String,
        description: String,
        expirySecs: NSNumber,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                let invoice = try _nodes[nodeId]!.receiveVariableAmountPayment(
                    description: description,
                    expirySecs: UInt32(truncating: expirySecs)
                )
                resolve(invoice)
            } catch let error {
                reject("Receive variable amount payment invoice error", "\(error)", error)
            }
        }
    }


    @objc
    func listPayments(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            let items: [PaymentDetails] = _nodes[nodeId]!.listPayments()
            var payments: [Any] = []
            for item in items {
                payments.append(getPaymentDetails(payment: item))
            }
            resolve(payments)
        }
    }
    
    @objc
    func listPeers(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            let items: [PeerDetails] = _nodes[nodeId]!.listPeers()
            var peers: [Any] = []
            for item in items {
                peers.append(getPeerDetails(peer: item))
            }
            resolve(peers)
        }
    }

    @objc
    func listChannels(_
        nodeId: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            let items: [ChannelDetails] = _nodes[nodeId]!.listChannels()
            var channels: [Any] = []
            for item in items {
                channels.append(getChannelDetails(channel: item))
            }
            resolve(channels)
        }
    }

    @objc
    func payment(_
        nodeId: String,
        paymentHash: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            let result = _nodes[nodeId]!.payment(paymentHash: paymentHash)
            let details = getPaymentDetails(payment: result!)
            resolve(details)
        }
    }

    @objc
    func removePayment(_
        nodeId: String,
        paymentHash: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                resolve(try _nodes[nodeId]!.removePayment(paymentHash: paymentHash))
            } catch let error {
                reject("Remove payment error", "\(error)", error)
            }
        }
    }


    @objc
    func signMessage(_
        nodeId: String,
        msg: NSArray,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                let message = try _nodes[nodeId]!.signMessage(msg: getNatieBytes(list: msg))
                resolve(message)
            } catch let error {
                reject("Sign message error", "\(error)", error)
            }
        }
    }

    @objc
    func verifySignature(_
        nodeId: String,
        msg: NSArray,
        sig: String,
        pkey: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            resolve(_nodes[nodeId]!.verifySignature(msg: getNatieBytes(list: msg), sig: sig, pkey: pkey))
        }
    }

    @objc
    func updateChannelConfig(_
        nodeId: String,
        channelId: String,
        counterpartyNodeId: String,
        channelConfig: NSDictionary,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.main.async { [self] in
            do {
                try _nodes[nodeId]!.updateChannelConfig(
                    channelId: channelId,
                    counterpartyNodeId: counterpartyNodeId,
                    channelConfig: createChannelConfig(config: channelConfig)
                )
                resolve(true)
            } catch let error {
                reject("Update channel config error", "\(error)", error)
            }
        }
    }
    /** Node methods ends */

    /** Utilities methods start */
    @objc
    func createEntropyMnemonic(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async { 
            resolve(generateEntropyMnemonic())
        }
    }


}

