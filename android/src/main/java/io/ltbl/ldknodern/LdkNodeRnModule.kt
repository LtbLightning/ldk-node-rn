package io.ltbl.ldknodern

import androidx.annotation.RequiresPermission.Read
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.UiThreadUtil.runOnUiThread
import org.lightningdevkit.ldknode.*


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
    private var _channelConfigs = mutableMapOf<String, ChannelConfig>()

    /** Config Methods starts */
    @ReactMethod
    fun createConfig(
        storageDirPath: String,
        logDirPath: String?,
        network: String,
        listeningAddresses: ReadableArray,
        defaultCltvExpiryDelta: Int? = 144,
        onchainWalletSyncIntervalSecs: Int? = 80,
        walletSyncIntervalSecs: Int? = 30,
        feeRateCacheUpdateIntervalSecs: Int? = 600,
        trustedPeers0conf: ReadableArray,
        probingLiquidityLimitMultiplier: Int? = 3,
        logLevel: String,
        result: Promise
    ) {
        Thread {
            val id = randomId()
            _configs[id] = Config(
                storageDirPath,
                logDirPath,
                getNetworkEnum(network),
                getNativeSocketAddressList(listeningAddresses),
                defaultCltvExpiryDelta!!.toUInt(),
                onchainWalletSyncIntervalSecs!!.toULong(),
                walletSyncIntervalSecs!!.toULong(),
                feeRateCacheUpdateIntervalSecs!!.toULong(),
                getNativeTrustedPeers0conf(trustedPeers0conf),
                probingLiquidityLimitMultiplier!!.toULong(),
                getLogLevelEnum(logLevel),
                    anchorChannelsConfig = null
            )
            runOnUiThread {
                result.resolve(id)
            }
        }.start()

    }
    /** Config Method ends */

    /** Builder Methods starts */
    @ReactMethod
    fun fromConfig(configId: String, result: Promise) {
        Thread {
            val id = randomId()
            _builders[id] = Builder.fromConfig(_configs[configId]!!)
            runOnUiThread {
                result.resolve(id)
            }
        }.start()
    }

    @ReactMethod
    fun setEntropySeedPath(builderId: String, seedPath: String, result: Promise) {
        Thread {
            _builders[builderId]!!.setEntropySeedPath(seedPath)
            runOnUiThread {
                result.resolve(true)
            }
        }.start()
    }

    @ReactMethod
    fun setEntropySeedBytes(builderId: String, seedBytes: ReadableArray, result: Promise) {
        Thread {
            _builders[builderId]!!.setEntropySeedBytes(getNatieBytes(seedBytes))
            runOnUiThread {
                result.resolve(true)
            }
        }.start()
    }

    @ReactMethod
    fun setEntropyBip39Mnemonic(
        builderId: String, mnemonic: String, passphrase: String?, result: Promise
    ) {
        Thread {
            _builders[builderId]!!.setEntropyBip39Mnemonic(mnemonic, passphrase)
            runOnUiThread {
                result.resolve(true)
            }
        }.start()
    }

    @ReactMethod
    fun setEsploraServer(builderId: String, esploraServerUrl: String, result: Promise) {
        Thread {
            _builders[builderId]!!.setEsploraServer(esploraServerUrl)
            runOnUiThread {
                result.resolve(true)
            }
        }.start()
    }

    @ReactMethod
    fun setGossipSourceP2p(builderId: String, result: Promise) {
        Thread {
            _builders[builderId]!!.setGossipSourceP2p()
            runOnUiThread {
                result.resolve(true)
            }
        }.start()
    }

    @ReactMethod
    fun setGossipSourceRgs(builderId: String, rgsServerUrl: String, result: Promise) {
        Thread {
            _builders[builderId]!!.setGossipSourceRgs(rgsServerUrl)
            runOnUiThread {
                result.resolve(true)
            }
        }.start()
    }

    @ReactMethod
    fun setStorageDirPath(builderId: String, storageDirPath: String, result: Promise) {
        Thread {
            _builders[builderId]!!.setStorageDirPath(storageDirPath)
            runOnUiThread {
                result.resolve(true)
            }
        }.start()
    }

    @ReactMethod
    fun setNetwork(builderId: String, network: String, result: Promise) {
        Thread {
            _builders[builderId]!!.setNetwork(getNetworkEnum(network))
            runOnUiThread {
                result.resolve(true)
            }
        }.start()
    }

    @ReactMethod
    fun setListeningAddress(builderId: String, listeningAddresses: ReadableArray, result: Promise) {
        Thread {
            _builders[builderId]!!.setListeningAddresses(
                getNativeSocketAddressList(
                    listeningAddresses
                )
            )
            runOnUiThread {
                result.resolve(true)
            }
        }.start()
    }

    @ReactMethod
    fun build(builderId: String, result: Promise) {
        Thread {
            val id = randomId()
            _nodes[id] = _builders[builderId]!!.build()
            runOnUiThread {
                result.resolve(id)
            }
        }.start()
    }
    /** Builder Methods ends */

    /** Node methods starts */
    @ReactMethod
    fun start(nodeId: String, result: Promise) {
        Thread {
            try {
                _nodes[nodeId]!!.start()
                runOnUiThread {
                    result.resolve(true)
                }
            } catch (error: Throwable) {
                result.reject("Node start error", error.localizedMessage, error)
            }
        }.start()
    }

    @ReactMethod
    fun stop(nodeId: String, result: Promise) {
        Thread {
            try {
                _nodes[nodeId]!!.stop()
                runOnUiThread {
                    result.resolve(true)
                }
            } catch (error: Throwable) {
                result.reject("Node stop error", error.localizedMessage, error)
            }
        }.start()
    }

    @ReactMethod
    fun syncWallets(nodeId: String, result: Promise) {
        Thread {
            try {
                _nodes[nodeId]!!.syncWallets()
                runOnUiThread {
                    result.resolve(true)
                }
            } catch (error: Throwable) {
                result.reject("Node syncWallets error", error.localizedMessage, error)
            }
        }.start()
    }

    @ReactMethod
    fun nodeId(nodeId: String, result: Promise) {
        Thread {
            runOnUiThread {
                result.resolve(_nodes[nodeId]!!.nodeId())
            }
        }.start()
    }

    @ReactMethod
    fun listeningAddresses(nodeId: String, result: Promise) {
        Thread {
            runOnUiThread {
                result.resolve(Arguments.makeNativeArray(_nodes[nodeId]!!.listeningAddresses()))
            }
        }.start()
    }


    @ReactMethod
    fun newOnchainAddress(nodeId: String, result: Promise) {
        Thread {
            try {
                runOnUiThread {
                    result.resolve(_nodes[nodeId]!!.onchainPayment().newAddress())
                }
            } catch (error: Throwable) {
                result.reject("Node newFundingAddress error", error.localizedMessage, error)
            }
        }.start()
    }

    @ReactMethod
    fun sendToOnchainAddress(nodeId: String, address: String, amountMsat: Int, result: Promise) {
        Thread {
            try {
                runOnUiThread {
                    result.resolve(
                        _nodes[nodeId]!!.onchainPayment().sendToAddress(
                            address,
                            amountMsat.toULong()
                        )
                    )
                }
            } catch (error: Throwable) {
                result.reject("Node sendToOnchainAddress error", error.localizedMessage, error)
            }
        }.start()
    }

    @ReactMethod
    fun sendAllToOnchainAddress(nodeId: String, address: String, result: Promise) {
        Thread {
            try {
                runOnUiThread {
                    result.resolve(_nodes[nodeId]!!.onchainPayment().sendAllToAddress(address))
                }

            } catch (error: Throwable) {
                result.reject("Node sendAllToOnchainAddress error", error.localizedMessage, error)
            }
        }.start()
    }

    @ReactMethod
    fun spendableOnchainBalanceSats(nodeId: String, result: Promise) {
        Thread {
            try {
                runOnUiThread {
                    result.resolve(_nodes[nodeId]!!.listBalances().spendableOnchainBalanceSats.toFloat())
                }
            } catch (error: Throwable) {
                result.reject(
                    "Node spendableOnchainBalanceSats error",
                    error.localizedMessage,
                    error
                )
            }
        }.start()
    }

    @ReactMethod
    fun totalOnchainBalanceSats(nodeId: String, result: Promise) {
        Thread {
            try {
                runOnUiThread {
                    result.resolve(_nodes[nodeId]!!.listBalances().totalOnchainBalanceSats.toFloat())
                }
            } catch (error: Throwable) {
                result.reject("Node totalOnchainBalanceSats error", error.localizedMessage, error)
            }
        }.start()
    }

    @ReactMethod
    fun connect(
        nodeId: String, pubKey: String, address: String, persist: Boolean, result: Promise
    ) {
        Thread {
            try {
                _nodes[nodeId]!!.connect(pubKey, address, persist)
                runOnUiThread {
                    result.resolve(true)
                }
            } catch (error: Throwable) {
                result.reject("Node connect error", error.localizedMessage, error)
            }
        }.start()
    }

    @ReactMethod
    fun disconnect(nodeId: String, pubKey: String, result: Promise) {
        Thread {
            try {
                _nodes[nodeId]!!.disconnect(pubKey)
                runOnUiThread {
                    result.resolve(true)
                }
            } catch (error: Throwable) {
                result.reject("Node disconnect error", error.localizedMessage, error)
            }
        }.start()
    }

    @ReactMethod
    fun connectOpenChannel(
        nodeId: String,
        pubKey: String,
        address: String,
        channelAmountSats: Int,
        pushToCounterpartyMsat: Int,
        channelConfigId: String? = null,
        announceChannel: Boolean,
        result: Promise
    ) {
        Thread {
            try {
                var config: ChannelConfig? = null
                if (channelConfigId != null) config = _channelConfigs[channelConfigId]
                _nodes[nodeId]!!.connectOpenChannel(
                    pubKey,
                    address,
                    channelAmountSats.toULong(),
                    pushToCounterpartyMsat.toULong(),
                    config,
                    announceChannel
                )
                runOnUiThread {
                    result.resolve(true)
                }
            } catch (error: Throwable) {
                result.reject("Node open channel error", error.localizedMessage, error)
            }
        }.start()
    }

    @ReactMethod
    fun sendPayment(nodeId: String, invoice: String, result: Promise) {
        Thread {
            try {
                runOnUiThread {
                    result.resolve(_nodes[nodeId]!!.bolt11Payment().send(invoice))
                }
            } catch (error: Throwable) {
                result.reject("Send payment invoice error", error.localizedMessage, error)
            }
        }.start()
    }

    @ReactMethod
    fun sendPaymentUsingAmount(
        nodeId: String, invoice: String, amountMsat: Int, result: Promise
    ) {
        Thread {
            try {
                var paymenthash =
                    _nodes[nodeId]!!.bolt11Payment().sendUsingAmount(invoice, amountMsat.toULong())
                runOnUiThread {
                    result.resolve(paymenthash)
                }
            } catch (error: Throwable) {
                result.reject(
                    "Send payment using amount invoice error",
                    error.localizedMessage,
                    error
                )
            }
        }.start()
    }

    @ReactMethod
    fun sendSpontaneousPayment(
        nodeId: String, amountMsat: Int, pubKey: String, result: Promise
    ) {
        Thread {
            try {
                var paymenthash =
                    _nodes[nodeId]!!.spontaneousPayment().send(amountMsat.toULong(), pubKey)
                runOnUiThread {
                    result.resolve(paymenthash)
                }
            } catch (error: Throwable) {
                result.reject("Send spontaneous payment error", error.localizedMessage, error)
            }
        }.start()
    }

    @ReactMethod
    fun receivePayment(
        nodeId: String, amountMsat: Int, description: String, expirySecs: Int, result: Promise
    ) {
        Thread {
            try {
                val invoice = _nodes[nodeId]!!.bolt11Payment().receive(
                    amountMsat.toULong(), description, expirySecs.toUInt()
                )
                runOnUiThread {
                    result.resolve(invoice)
                }
            } catch (error: Throwable) {
                result.reject("Receive payment invoice error", error.localizedMessage, error)
            }
        }.start()
    }

    @ReactMethod
    fun receiveVariableAmountPayment(
        nodeId: String, description: String, expirySecs: Int, result: Promise
    ) {
        Thread {
            try {
                val invoice = _nodes[nodeId]!!.bolt11Payment().receiveVariableAmount(
                    description, expirySecs.toUInt()
                )
                runOnUiThread {
                    result.resolve(invoice)
                }
            } catch (error: Throwable) {
                result.reject(
                    "Receive variable amount payment invoice error", error.localizedMessage, error
                )
            }
        }.start()
    }

    @ReactMethod
    fun listPayments(nodeId: String, result: Promise) {
        Thread {
            val items = _nodes[nodeId]!!.listPayments()
            val payments: MutableList<Map<String, Any?>> = mutableListOf()
            for (item in items) {
                payments.add(getPaymentDetails(item))
            }
            runOnUiThread {
                result.resolve(Arguments.makeNativeArray(payments))
            }
        }.start()
    }

    @ReactMethod
    fun listPeers(nodeId: String, result: Promise) {
        Thread {
            val items = _nodes[nodeId]!!.listPeers()
            val peers: MutableList<Map<String, Any?>> = mutableListOf()
            for (item in items) {
                peers.add(getPeerDetails(item))
            }
            runOnUiThread {
                result.resolve(Arguments.makeNativeArray(peers))
            }
        }.start()
    }

    @ReactMethod
    fun listChannels(nodeId: String, result: Promise) {
        Thread {
            val items = _nodes[nodeId]!!.listChannels()
            val channels: MutableList<Map<String, Any?>> = mutableListOf()
            for (item in items) {
                channels.add(getChannelDetails(item))
            }
            runOnUiThread {
                result.resolve(Arguments.makeNativeArray(channels))
            }
        }.start()
    }


    @ReactMethod
    fun payment(nodeId: String, paymentHash: String, result: Promise) {
        Thread {
            var res = _nodes[nodeId]!!.payment(paymentHash)
            var details = getPaymentDetails(res!!)
            runOnUiThread {
                result.resolve(Arguments.makeNativeMap(details))
            }
        }.start()
    }

    @ReactMethod
    fun removePayment(nodeId: String, paymentHash: String, result: Promise) {
        Thread {
            try {
                runOnUiThread {
                    result.resolve(_nodes[nodeId]!!.removePayment(paymentHash))
                }
            } catch (error: Throwable) {
                result.reject("Remove payment error", error.localizedMessage, error)
            }
        }.start()
    }

    @ReactMethod
    fun signMessage(nodeId: String, msg: ReadableArray, result: Promise) {
        Thread {
            try {
                runOnUiThread {
                    result.resolve(_nodes[nodeId]!!.signMessage(getNatieBytes(msg)))
                }
            } catch (error: Throwable) {
                result.reject("Sign message error", error.localizedMessage, error)
            }
        }.start()
    }

    @ReactMethod
    fun verifySignature(
        nodeId: String, msg: ReadableArray, sig: String, pkey: String, result: Promise
    ) {
        Thread {
            runOnUiThread {
                result.resolve(_nodes[nodeId]!!.verifySignature(getNatieBytes(msg), sig, pkey))
            }
        }.start()
    }

    @ReactMethod
    fun updateChannelConfig(
        nodeId: String,
        channelId: String,
        counterpartyNodeId: String,
        channelConfigId: String,
        result: Promise
    ) {
        Thread {
            try {
                _nodes[nodeId]!!.updateChannelConfig(
                    channelId, counterpartyNodeId, _channelConfigs[channelConfigId]!!
                )
                runOnUiThread {
                    result.resolve(true)
                }
            } catch (error: Throwable) {
                result.reject("Update channel config error", error.localizedMessage, error)
            }
        }.start()
    }


    @ReactMethod
    fun isRunning(nodeId: String, result: Promise) {
        Thread {
            result.resolve(_nodes[nodeId]!!.status().isRunning)
        }.start()
    }


    @ReactMethod
    fun sendPaymentProbes(nodeId: String, invoice: String, result: Promise) {
        Thread {
            try {
                runOnUiThread {
                    result.resolve(_nodes[nodeId]!!.bolt11Payment().sendProbes(invoice))
                }
            } catch (error: Throwable) {
                result.reject("Send payment probes error", error.localizedMessage, error)
            }
        }.start()
    }


    @ReactMethod
    fun sendPaymentProbesUsingAmount(
        nodeId: String, invoice: String, amountMsat: Int, result: Promise
    ) {
        Thread {
            try {
                var paymenthash =
                    _nodes[nodeId]!!.bolt11Payment().sendProbesUsingAmount(invoice, amountMsat.toULong())
                runOnUiThread {
                    result.resolve(paymenthash)
                }
            } catch (error: Throwable) {
                result.reject(
                    "Send payment probes using amount invoice error",
                    error.localizedMessage,
                    error
                )
            }
        }.start()
    }

    @ReactMethod
    fun sendSpontaneousPaymentProbes(
        nodeId: String, amountMsat: Int, pubKey: String, result: Promise
    ) {
        Thread {
            try {
                var paymenthash =
                    _nodes[nodeId]!!.spontaneousPayment().sendProbes(amountMsat.toULong(), pubKey)
                runOnUiThread {
                    result.resolve(paymenthash)
                }
            } catch (error: Throwable) {
                result.reject(
                    "Send spontaneous payment probes error",
                    error.localizedMessage,
                    error
                )
            }
        }.start()
    }

    /** Node methods ends */


    /** Utilities methods start */
    @ReactMethod
    fun createEntropyMnemonic(result: Promise) {
        Thread {
            runOnUiThread {
                result.resolve(generateEntropyMnemonic())
            }
        }.start()
    }

    /** ChannelConfig methods ends */

    @ReactMethod
    fun createChannelConfig(result: Promise) {
        Thread {
            runOnUiThread {
                val id = randomId()
                _channelConfigs[id] = ChannelConfig()
                result.resolve(id)
            }
        }.start()
    }

    @ReactMethod
    fun acceptUnderpayingHtlcs(channelConfigId: String, result: Promise) {
        Thread {
            runOnUiThread {
                result.resolve(_channelConfigs[channelConfigId]!!.acceptUnderpayingHtlcs())
            }
        }.start()
    }

    @ReactMethod
    fun cltvExpiryDelta(channelConfigId: String, result: Promise) {
        Thread {
            runOnUiThread {
                result.resolve(_channelConfigs[channelConfigId]!!.cltvExpiryDelta().toFloat())
            }
        }.start()
    }

    @ReactMethod
    fun forceCloseAvoidanceMaxFeeSatoshis(channelConfigId: String, result: Promise) {
        Thread {
            runOnUiThread {
                result.resolve(_channelConfigs[channelConfigId]!!.forceCloseAvoidanceMaxFeeSatoshis().toFloat())
            }
        }.start()
    }

    @ReactMethod
    fun forwardingFeeBaseMsat(channelConfigId: String, result: Promise) {
        Thread {
            runOnUiThread {
                result.resolve(_channelConfigs[channelConfigId]!!.forwardingFeeBaseMsat().toInt())
            }
        }.start()
    }

    @ReactMethod
    fun forwardingFeeProportionalMillionths(channelConfigId: String, result: Promise) {
        Thread {
            runOnUiThread {
                result.resolve(_channelConfigs[channelConfigId]!!.forwardingFeeProportionalMillionths().toInt())
            }
        }.start()
    }

    @ReactMethod
    fun setAcceptUnderpayingHtlcs(channelConfigId: String, value: Boolean, result: Promise) {
        Thread {
            runOnUiThread {
                _channelConfigs[channelConfigId]!!.setAcceptUnderpayingHtlcs(value)
                result.resolve(true)
            }
        }.start()
    }


    @ReactMethod
    fun setCltvExpiryDelta(channelConfigId: String, value: Int, result: Promise) {
        Thread {
            runOnUiThread {
                _channelConfigs[channelConfigId]!!.setCltvExpiryDelta(value.toUShort())
                result.resolve(true)
            }
        }.start()
    }

    @ReactMethod
    fun setForceCloseAvoidanceMaxFeeSatoshis(
        channelConfigId: String,
        valueSat: Int,
        result: Promise
    ) {
        Thread {
            runOnUiThread {
                _channelConfigs[channelConfigId]!!.setForceCloseAvoidanceMaxFeeSatoshis(valueSat.toULong())
                result.resolve(true)
            }
        }.start()
    }

    @ReactMethod
    fun setForwardingFeeBaseMsat(channelConfigId: String, feeMsat: Int, result: Promise) {
        Thread {
            runOnUiThread {
                _channelConfigs[channelConfigId]!!.setForwardingFeeBaseMsat(feeMsat.toUInt())
                result.resolve(true)
            }
        }.start()
    }

    @ReactMethod
    fun setForwardingFeeProportionalMillionths(
        channelConfigId: String,
        value: Int,
        result: Promise
    ) {
        Thread {
            runOnUiThread {
                _channelConfigs[channelConfigId]!!.setForwardingFeeProportionalMillionths(value.toUInt())
                result.resolve(true)
            }
        }.start()
    }

    @ReactMethod
    fun setMaxDustHtlcExposureFromFeeRateMultiplier(
        channelConfigId: String,
        multiplier: Int,
        result: Promise
    ) {
        Thread {
            runOnUiThread {
                _channelConfigs[channelConfigId]!!.setMaxDustHtlcExposureFromFeeRateMultiplier(
                    multiplier.toULong()
                )
                result.resolve(true)
            }
        }.start()
    }

    @ReactMethod
    fun setMaxDustHtlcExposureFromFixedLimit(
        channelConfigId: String,
        limitMsat: Int,
        result: Promise
    ) {
        Thread {
            runOnUiThread {
                _channelConfigs[channelConfigId]!!.setMaxDustHtlcExposureFromFixedLimit(limitMsat.toULong())
                result.resolve(true)
            }
        }.start()
    }

}

