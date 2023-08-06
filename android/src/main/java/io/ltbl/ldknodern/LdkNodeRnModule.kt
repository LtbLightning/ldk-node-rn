package io.ltbl.ldknodern

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap


class LdkNodeRnModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "LdkNodeRnModule"
    override fun getConstants(): MutableMap<String, Any> {
        return hashMapOf("count" to 1)
    }

    /***================ LDK code ===============*/
    private var _configs = mutableMapOf<String, Config>()
    private var _builders = mutableMapOf<String, Builder>()
    private var _nodes = mutableMapOf<String, LdkNode>()

    /** Config Methods starts */
    @ReactMethod
    fun createConfig(
        storageDirPath: String,
        logDirPath: String,
        network: String,
        listeningAddress: String? = null,
        defaultCltvExpiryDelta: Int? = 144,
        onchainWalletSyncIntervalSecs: Int? = 80,
        walletSyncIntervalSecs: Int? = 30,
        feeRateCacheUpdateIntervalSecs: Int? = 600,
        logLevel: String,
        trustedPeers0conf: ReadableArray,
        result: Promise
    ) {
        val id = randomId()
        _configs[id] = Config(
            storageDirPath,
            logDirPath,
            getNetworkEnum(network),
            listeningAddress,
            defaultCltvExpiryDelta!!.toUInt(),
            onchainWalletSyncIntervalSecs!!.toULong(),
            walletSyncIntervalSecs!!.toULong(),
            feeRateCacheUpdateIntervalSecs!!.toULong(),
            getLogLevelEnum(logLevel),
            trustedPeers0conf as List<PublicKey>
        )
        result.resolve(id)
    }
    /** Config Method ends */

    /** Builder Methods starts */
    @ReactMethod
    fun fromConfig(configId: String, result: Promise) {
        val id = randomId()
        _builders[id] = Builder.fromConfig(_configs[configId]!!)
        result.resolve(id)
    }

    @ReactMethod
    fun setEntropySeedPath(builderId: String, seedPath: String, result: Promise) {
        _builders[builderId]!!.setEntropySeedPath(seedPath)
        result.resolve(true)
    }

    @ReactMethod
    fun setEntropySeedBytes(builderId: String, seedBytes: ReadableArray, result: Promise) {
        _builders[builderId]!!.setEntropySeedBytes(getNatieBytes(seedBytes))
        result.resolve(true)
    }

    @ReactMethod
    fun setEntropyBip39Mnemonic(
        builderId: String,
        mnemonic: String,
        passphrase: String?,
        result: Promise
    ) {
        _builders[builderId]!!.setEntropyBip39Mnemonic(mnemonic, passphrase)
        result.resolve(true)
    }

    @ReactMethod
    fun setEsploraServer(builderId: String, esploraServerUrl: String, result: Promise) {
        _builders[builderId]!!.setEsploraServer(esploraServerUrl)
        result.resolve(true)
    }

    @ReactMethod
    fun setGossipSourceP2p(builderId: String, result: Promise) {
        _builders[builderId]!!.setGossipSourceP2p()
        result.resolve(true)
    }

    @ReactMethod
    fun setGossipSourceRgs(builderId: String, rgsServerUrl: String, result: Promise) {
        _builders[builderId]!!.setGossipSourceRgs(rgsServerUrl)
        result.resolve(true)
    }

    @ReactMethod
    fun setStorageDirPath(builderId: String, storageDirPath: String, result: Promise) {
        _builders[builderId]!!.setStorageDirPath(storageDirPath)
        result.resolve(true)
    }

    @ReactMethod
    fun setNetwork(builderId: String, network: String, result: Promise) {
        _builders[builderId]!!.setNetwork(getNetworkEnum(network))
        result.resolve(true)
    }

    @ReactMethod
    fun setListeningAddress(builderId: String, listeningAddress: String, result: Promise) {
        _builders[builderId]!!.setListeningAddress(listeningAddress)
        result.resolve(true)
    }

    @ReactMethod
    fun build(builderId: String, result: Promise) {
        val id = randomId()
        _nodes[id] = _builders[builderId]!!.build()
        result.resolve(id)
    }
    /** Builder Methods ends */

    /** Node methods starts */
    @ReactMethod
    fun start(nodeId: String, result: Promise) {
        try {
            _nodes[nodeId]!!.start()
            result.resolve(true)
        } catch (error: Throwable) {
            result.reject("Node start error", error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun stop(nodeId: String, result: Promise) {
        try {
            _nodes[nodeId]!!.stop()
            result.resolve(true)
        } catch (error: Throwable) {
            result.reject("Node stop error", error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun syncWallets(nodeId: String, result: Promise) {
        try {
            _nodes[nodeId]!!.syncWallets()
            result.resolve(true)
        } catch (error: Throwable) {
            result.reject("Node syncWallets error", error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun nodeId(nodeId: String, result: Promise) {
        result.resolve(_nodes[nodeId]!!.nodeId())
    }

    @ReactMethod
    fun listeningAddress(nodeId: String, result: Promise) {
        result.resolve(_nodes[nodeId]!!.listeningAddress())
    }


    @ReactMethod
    fun newOnchainAddress(nodeId: String, result: Promise) {
        try {
            result.resolve(_nodes[nodeId]!!.newOnchainAddress())
        } catch (error: Throwable) {
            result.reject("Node newFundingAddress error", error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun sendToOnchainAddress(nodeId: String, address: String, amountMsat: Int, result: Promise) {
        try {
            result.resolve(_nodes[nodeId]!!.sendToOnchainAddress(address, amountMsat.toULong()))
        } catch (error: Throwable) {
            result.reject("Node sendToOnchainAddress error", error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun sendAllToOnchainAddress(nodeId: String, address: String, result: Promise) {
        try {
            result.resolve(_nodes[nodeId]!!.sendAllToOnchainAddress(address))
        } catch (error: Throwable) {
            result.reject("Node sendAllToOnchainAddress error", error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun spendableOnchainBalanceSats(nodeId: String, result: Promise) {
        try {
            result.resolve(_nodes[nodeId]!!.spendableOnchainBalanceSats().toInt())
        } catch (error: Throwable) {
            result.reject("Node spendableOnchainBalanceSats error", error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun totalOnchainBalanceSats(nodeId: String, result: Promise) {
        try {
            result.resolve(_nodes[nodeId]!!.spendableOnchainBalanceSats().toInt())
        } catch (error: Throwable) {
            result.reject("Node spendableOnchainBalanceSats error", error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun connect(
        nodeId: String,
        pubKey: String,
        address: String,
        persist: Boolean,
        result: Promise
    ) {
        try {
            _nodes[nodeId]!!.connect(pubKey, address, persist)
            result.resolve(true)
        } catch (error: Throwable) {
            result.reject("Node connect error", error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun disconnect(nodeId: String, pubKey: String, result: Promise) {
        try {
            _nodes[nodeId]!!.disconnect(pubKey)
            result.resolve(true)
        } catch (error: Throwable) {
            result.reject("Node disconnect error", error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun connectOpenChannel(
        nodeId: String,
        pubKey: String,
        address: String,
        channelAmountSats: Int,
        pushToCounterpartyMsat: Int,
        channelConfig: ReadableMap? = null,
        announceChannel: Boolean,
        result: Promise
    ) {
        try {
            var config: ChannelConfig? = null
            if (channelConfig != null) config = createChannelConfig(channelConfig)

            _nodes[nodeId]!!.connectOpenChannel(
                pubKey,
                address,
                channelAmountSats.toULong(),
                pushToCounterpartyMsat.toULong(),
                config,
                announceChannel
            )
            result.resolve(true)
        } catch (error: Throwable) {
            result.reject("Node open channel error", error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun sendPayment(nodeId: String, invoice: String, result: Promise) {
        try {
            result.resolve(_nodes[nodeId]!!.sendPayment(invoice))
        } catch (error: Throwable) {
            result.reject("Send payment invoice error", error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun sendPaymentUsingAmount(
        nodeId: String,
        invoice: String,
        amountMsat: Int,
        result: Promise
    ) {
        try {
            var paymenthash = _nodes[nodeId]!!.sendPaymentUsingAmount(invoice, amountMsat.toULong())
            result.resolve(paymenthash)
        } catch (error: Throwable) {
            result.reject("Send payment using amount invoice error", error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun sendSpontaneousPayment(
        nodeId: String,
        amountMsat: Int,
        pubKey: String,
        result: Promise
    ) {
        try {
            var invoice = _nodes[nodeId]!!.sendSpontaneousPayment(amountMsat.toULong(), pubKey)
            result.resolve(invoice)
        } catch (error: Throwable) {
            result.reject("Send spontaneous payment error", error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun receivePayment(
        nodeId: String,
        amountMsat: Int,
        description: String,
        expirySecs: Int,
        result: Promise
    ) {
        try {
            val invoice = _nodes[nodeId]!!.receivePayment(
                amountMsat.toULong(),
                description,
                expirySecs.toUInt()
            )
            result.resolve(invoice)
        } catch (error: Throwable) {
            result.reject("Receive payment invoice error", error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun receiveVariableAmountPayment(
        nodeId: String,
        description: String,
        expirySecs: Int,
        result: Promise
    ) {
        try {
            val invoice = _nodes[nodeId]!!.receiveVariableAmountPayment(
                description,
                expirySecs.toUInt()
            )
            result.resolve(invoice)
        } catch (error: Throwable) {
            result.reject(
                "Receive variable amount payment invoice error",
                error.localizedMessage,
                error
            )
        }
    }

    @ReactMethod
    fun listPayments(nodeId: String, result: Promise) {
        val items = _nodes[nodeId]!!.listPayments()
        val payments: MutableList<Map<String, Any?>> = mutableListOf()
        for (item in items) {
            payments.add(getPaymentDetails(item))
        }
        result.resolve(Arguments.makeNativeArray(payments))
    }

    @ReactMethod
    fun listPeers(nodeId: String, result: Promise) {
        val items = _nodes[nodeId]!!.listPeers()
        val peers: MutableList<Map<String, Any?>> = mutableListOf()
        for (item in items) {
            peers.add(getPeerDetails(item))
        }
        result.resolve(Arguments.makeNativeArray(peers))
    }

    @ReactMethod
    fun listChannels(nodeId: String, result: Promise) {
        val items = _nodes[nodeId]!!.listChannels()
        val channels: MutableList<Map<String, Any?>> = mutableListOf()
        for (item in items) {
            channels.add(getChannelDetails(item))
        }
        result.resolve(Arguments.makeNativeArray(channels))
    }


    @ReactMethod
    fun payment(nodeId: String, paymentHash: String, result: Promise) {
        var res = _nodes[nodeId]!!.payment(paymentHash)
        var details = getPaymentDetails(res!!)
        result.resolve(Arguments.makeNativeMap(details))
    }

    @ReactMethod
    fun removePayment(nodeId: String, paymentHash: String, result: Promise) {
        try {
            result.resolve(_nodes[nodeId]!!.removePayment(paymentHash))
        } catch (error: Throwable) {
            result.reject("Remove payment error", error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun signMessage(nodeId: String, msg: ReadableArray, result: Promise) {
        try {
            result.resolve(_nodes[nodeId]!!.signMessage(getNatieBytes(msg)))
        } catch (error: Throwable) {
            result.reject("Sign message error", error.localizedMessage, error)
        }
    }

    @ReactMethod
    fun verifySignature(
        nodeId: String,
        msg: ReadableArray,
        sig: String,
        pkey: String,
        result: Promise
    ) {
        result.resolve(_nodes[nodeId]!!.verifySignature(getNatieBytes(msg), sig, pkey))
    }

    @ReactMethod
    fun updateChannelConfig(
        nodeId: String,
        channelId: String,
        counterpartyNodeId: String,
        channelConfig: ReadableMap,
        result: Promise
    ) {
        try {
            _nodes[nodeId]!!.updateChannelConfig(
                channelId,
                counterpartyNodeId,
                createChannelConfig(channelConfig)
            )
            result.resolve(true)
        } catch (error: Throwable) {
            result.reject("Update channel config error", error.localizedMessage, error)
        }
    }

    /** Node methods ends */


    /** Utilities methods start */
    @ReactMethod
    fun createEntropyMnemonic(result: Promise) {
        result.resolve(generateEntropyMnemonic())
    }
}

