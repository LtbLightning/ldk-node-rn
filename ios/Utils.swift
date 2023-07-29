import Foundation

func randomId() -> String {
    return UUID().uuidString
}

func getPeerDetails(peer: PeerDetails) -> [String: Any] {
    return [
        "nodeId": peer.nodeId,
        "address": peer.address,
        "isConnected": peer.isConnected
    ] as [String: Any]

}


func getChannelDetails(channel: ChannelDetails) -> [String: Any] {
    return [
        "channelId": channel.channelId,
        "counterpartyNodeId": channel.counterpartyNodeId,
        "fundingTxo": [
            "txid": channel.fundingTxo?.txid as Any,
            "vout": channel.fundingTxo?.vout as Any
        ],
        "channelValueSatoshis": channel.channelValueSatoshis,
        "unspendablePunishmentReserve": channel.unspendablePunishmentReserve!,
        "userChannelId": channel.userChannelId,
        "balanceMsat": channel.balanceMsat,
        "outboundCapacityMsat": channel.outboundCapacityMsat,
        "inboundCapacityMsat": channel.inboundCapacityMsat,
        "confirmationsRequired": channel.confirmationsRequired as Any,
        "confirmations": channel.confirmations as Any,
        "isOutbound": channel.isOutbound,
        "isChannelReady": channel.isChannelReady,
        "isUsable": channel.isUsable,
        "isPublic": channel.isPublic,
        "cltvExpiryDelta": channel.cltvExpiryDelta as Any

    ] as [String: Any]
}

func getPaymentDetails(payment: PaymentDetails) -> [String: Any] {
    return [
        "hash": payment.hash,
        "preimage": payment.preimage as Any,
        "secret": payment.secret as Any,
        "amountMsat": payment.amountMsat as Any,
        "direction": getPaymentDirection(direction: payment.direction),
        "status": getPaymentStatus(status: payment.status)
    ] as [String: Any]
}



func getPaymentDirection(direction: PaymentDirection) -> String {
    switch (direction) {
        case PaymentDirection.inbound: return "inbound"
        case PaymentDirection.outbound: return "outbound"
    }
}


func getPaymentStatus(status: PaymentStatus) -> String {
    switch (status) {
        case PaymentStatus.pending: return "pending"
        case PaymentStatus.succeeded: return "succeeded"
        case PaymentStatus.failed: return "failed"
    }
}


func getMessage(msg: NSArray) -> Array<UInt8> {
    var msgArray: [UInt8] = []
    for i in msg {
        msgArray.append(UInt8(Int8(i as! UInt8)))
    }
    return msgArray
}
