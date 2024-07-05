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
        "channelValueSats": channel.channelValueSats,
        "unspendablePunishmentReserve": channel.unspendablePunishmentReserve!,
        "userChannelId": channel.userChannelId,
        "outboundCapacityMsat": channel.outboundCapacityMsat,
        "inboundCapacityMsat": channel.inboundCapacityMsat,
        "confirmationsRequired": channel.confirmationsRequired as Any,
        "confirmations": channel.confirmations as Any,
        "isOutbound": channel.isOutbound,
        "isChannelReady": channel.isChannelReady,
        "isUsable": channel.isUsable,
        "isPublic": channel.isPublic,
        "cltvExpiryDelta": channel.cltvExpiryDelta as Any,
        "counterpartyUnspendablePunishmentReserve": channel.counterpartyUnspendablePunishmentReserve,
        "counterpartyOutboundHtlcMinimumMsat": channel.counterpartyOutboundHtlcMinimumMsat as Any,
        "counterpartyOutboundHtlcMaximumMsat": channel.counterpartyOutboundHtlcMaximumMsat as Any,
        "counterpartyForwardingInfoFeeBaseMsat": channel.counterpartyForwardingInfoFeeBaseMsat as Any,
        "counterpartyForwardingInfoFeeProportionalMillionths": channel.counterpartyForwardingInfoFeeProportionalMillionths as Any,
        "counterpartyForwardingInfoCltvExpiryDelta": channel.counterpartyForwardingInfoCltvExpiryDelta as Any,
        "nextOutboundHtlcLimitMsat": channel.nextOutboundHtlcLimitMsat,
        "nextOutboundHtlcMinimumMsat": channel.nextOutboundHtlcMinimumMsat,
        "forceCloseSpendDelay": channel.forceCloseSpendDelay as Any,
        "inboundHtlcMinimumMsat": channel.inboundHtlcMinimumMsat,
        "inboundHtlcMaximumMsat": channel.inboundHtlcMaximumMsat as Any

    ] as [String: Any]
}

func getPaymentDetails(payment: PaymentDetails) -> [String: Any] {
    return [
        "hash": payment.hash,

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


func getNatieBytes(list: NSArray) -> Array<UInt8> {
    var array: [UInt8] = []
    for i in list {
        array.append(UInt8(Int8(i as! UInt8)))
    }
    return array
}

func getNetworkEnum(networkStr: String?) -> Network {
    switch (networkStr) {
    case "testnet": return Network.testnet
    case "bitcoin": return Network.bitcoin
    case "regtest": return Network.regtest
    case "signet": return Network.signet
    default: return Network.testnet
    }
}

func getLogLevelEnum(logLevel: String) -> LogLevel {
    switch (logLevel) {
    case "gossip": return LogLevel.gossip
    case "trace": return LogLevel.trace
    case "debug": return LogLevel.debug
    case "info": return LogLevel.info
    case "warn": return LogLevel.warn
    case "error": return LogLevel.error
    default: return LogLevel.debug
    }
}

func getAnchorChannelsConfig() -> AnchorChannelsConfig {
    // Generate random UUIDs for PublicKey instances
    let publicKey1 = PublicKey(UUID().uuidString)
    let publicKey2 = PublicKey(UUID().uuidString)
    
    let trustedPeers = [publicKey1, publicKey2]
    let perChannelReserveSats: UInt64 = 100000 // Example value, adjust as needed

    return AnchorChannelsConfig(trustedPeersNoReserve: trustedPeers, perChannelReserveSats: perChannelReserveSats)
}
