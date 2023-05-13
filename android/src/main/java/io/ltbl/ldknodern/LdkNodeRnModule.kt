package io.ltbl.ldknodern

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
        listeningAddress: String,
        defaultCltvExpiryDelta: Int,
        result: Promise
    ) {
        val id = randomId()
        _configs[id] = Config(
            storageDirPath,
            esploraServerUrl,
            network,
            null,
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
    fun disconnect(
        nodeId: String,
        pubKey: String,
        result: Promise
    ) {
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
    /** Node methods ends */
}

