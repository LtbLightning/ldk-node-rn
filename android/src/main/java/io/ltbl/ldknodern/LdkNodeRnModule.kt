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
        println(_configs)
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
}

