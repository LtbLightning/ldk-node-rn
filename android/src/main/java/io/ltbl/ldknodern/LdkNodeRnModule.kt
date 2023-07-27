package io.ltbl.ldknodern

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class LdkNodeRnModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "LdkNodeRnModule"
    override fun getConstants(): MutableMap<String, Any> {
        return hashMapOf("count" to 1)
    }

    /***================ LDK code ===============*/
    private var _configs = mutableMapOf<String, Config>()
    private var _builders = mutableMapOf<String, Builder>()
    private var _nodes = mutableMapOf<String, Node>()

    /** Config Methods starts */
    @ReactMethod
    fun createConfig(
        storageDirPath: String,
        esploraServerUrl: String,
        network: String,
        listeningAddress: String? = null,
        defaultCltvExpiryDelta: Int,
        result: Promise
    ) {
        val id = randomId()
        _configs[id] = Config(
            storageDirPath,
            esploraServerUrl,
            network,
            listeningAddress,
            defaultCltvExpiryDelta.toUInt()
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
    fun newFundingAddress(nodeId: String, result: Promise) {
        try {
            result.resolve(_nodes[nodeId]!!.newFundingAddress())
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
        permanently: Boolean,
        result: Promise
    ) {
        try {
            _nodes[nodeId]!!.connect(pubKey, address, permanently)
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
        announceChannel: Boolean,
        result: Promise
    ) {
        try {
            _nodes[nodeId]!!.connectOpenChannel(
                pubKey,
                address,
                channelAmountSats.toULong(),
                pushToCounterpartyMsat.toULong(),
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
            result.reject("SSend spontaneous payment error", error.localizedMessage, error)
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
    fun listPeers(nodeId: String, result: Promise) {
        val list = _nodes[nodeId]!!.listPeers()
        val peers: MutableList<Map<String, Any?>> = mutableListOf()
        for (item in list) {
            peers.add(getPeerDetails(item))
        }
        result.resolve(Arguments.makeNativeArray(peers))
    }

    @ReactMethod
    fun listChannels(nodeId: String, result: Promise) {
        val list = _nodes[nodeId]!!.listChannels()
        val channels: MutableList<Map<String, Any?>> = mutableListOf()
        for (item in list) {
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

    /** Node methods ends */
}

