package io.ltbl.ldknodern

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
        "channelValueSatoshis" to channel.channelValueSatoshis.toInt(),
        "unspendablePunishmentReserve" to channel.unspendablePunishmentReserve!!.toInt(),
        "userChannelId" to channel.userChannelId,
        "balanceMsat" to channel.balanceMsat.toInt(),
        "outboundCapacityMsat" to channel.outboundCapacityMsat.toInt(),
        "inboundCapacityMsat" to channel.inboundCapacityMsat.toInt(),
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
    return mutableMapOf (
        "hash" to payment.hash,
        "preimage" to payment.preimage as Any,
        "secret" to payment.secret as Any,
        "amountMsat" to payment.amountMsat as Any,
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