package io.ltbl.ldknodern

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import org.lightningdevkit.ldknode.*
import java.util.UUID

fun randomId() = UUID.randomUUID().toString()

fun getPeerDetails(peer: PeerDetails): MutableMap<String, Any> {
    return mutableMapOf(
        "nodeId" to peer.nodeId,
        "address" to peer.address,
        "isConnected" to peer.isConnected,
    )
}

fun getChannelDetails(channel: ChannelDetails): MutableMap<String, Any> {
    return mutableMapOf(
        "channelId" to channel.channelId,
        "counterpartyNodeId" to channel.counterpartyNodeId,
        "fundingTxo" to mutableMapOf(
            "txid" to channel.fundingTxo?.txid as Any,
            "vout" to channel.fundingTxo?.vout?.toInt()
        ),
        "channelValueSats" to channel.channelValueSats.toFloat(),
        "unspendablePunishmentReserve" to channel.unspendablePunishmentReserve!!.toFloat(),
        "userChannelId" to channel.userChannelId,
        "balanceMsat" to channel.balanceMsat.toFloat(),
        "outboundCapacityMsat" to channel.outboundCapacityMsat.toFloat(),
        "inboundCapacityMsat" to channel.inboundCapacityMsat.toFloat(),
        "confirmationsRequired" to channel.confirmationsRequired!!.toInt(),
        "confirmations" to channel.confirmations!!.toInt(),
        "isOutbound" to channel.isOutbound,
        "isChannelReady" to channel.isChannelReady,
        "isUsable" to channel.isUsable,
        "isPublic" to channel.isPublic,
        "cltvExpiryDelta" to channel.cltvExpiryDelta.toString()
    )
}

fun getPaymentDetails(payment: PaymentDetails): MutableMap<String, Any> {
    return mutableMapOf(
        "hash" to payment.hash,
        "preimage" to payment.preimage.toString(),
        "secret" to payment.secret.toString(),
        "amountMsat" to payment.amountMsat!!.toFloat(),
        "direction" to getPaymentDirection(payment.direction),
        "status" to getPaymentStatus(payment.status)
    )
}

fun getPaymentDirection(direction: PaymentDirection): String {
    return when (direction) {
        PaymentDirection.INBOUND -> "inbound"
        PaymentDirection.OUTBOUND -> "outbound"
    }
}

fun getPaymentStatus(status: PaymentStatus): String {
    return when (status) {
        PaymentStatus.PENDING -> "pending"
        PaymentStatus.FAILED -> "failed"
        PaymentStatus.SUCCEEDED -> "succeeded"
    }
}

fun getNatieBytes(list: ReadableArray): List<UByte> {
    val array = ArrayList<UByte>()
    for (i in 0 until list.size()) {
        array.add(list.getInt(i).toUByte())
    }
    return array
}

fun getNetworkEnum(networkStr: String? = "testnet"): Network {
    return when (networkStr) {
        "testnet" -> Network.TESTNET
        "bitcoin" -> Network.BITCOIN
        "regtest" -> Network.REGTEST
        "signet" -> Network.SIGNET
        else -> Network.TESTNET
    }
}

fun createChannelConfig(options: ReadableMap): ChannelConfig {
    return ChannelConfig(
        options.getInt("forwardingFeeProportionalMillionths").toUInt(),
        options.getInt("forwardingFeeBaseMsat").toUInt(),
        options.getInt("cltvExpiryDelta").toUShort(),
        options.getInt("maxDustHtlcExposureMsat").toULong(),
        options.getInt("forceCloseAvoidanceMaxFeeSatoshis").toULong()
    )
}

fun getLogLevelEnum(logLevel: String): LogLevel {
    return when (logLevel) {
        "gossip" -> LogLevel.GOSSIP
        "trace" -> LogLevel.TRACE
        "debug" -> LogLevel.DEBUG
        "info" -> LogLevel.INFO
        "warn" -> LogLevel.WARN
        "error" -> LogLevel.ERROR
        else -> LogLevel.DEBUG
    }
}


fun getNatieTrustedPeers0conf(list: ReadableArray): List<PublicKey> {
    val array = ArrayList<PublicKey>()
    for (i in 0 until list.size()) {
        array.add(list.getString(i))
    }
    return array
}