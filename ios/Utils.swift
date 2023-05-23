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
            "txid": channel.fundingTxo?.txid  as Any,
            "vout": channel.fundingTxo?.vout as Any
        ],
        "channelValueSatoshis": channel.channelValueSatoshis,
        "unspendablePunishmentReserve": channel.unspendablePunishmentReserve!,
        "userChannelId": channel.userChannelId,
        "balanceMsat": channel.balanceMsat,
        "outboundCapacityMsat": channel.outboundCapacityMsat,
        "inboundCapacityMsat": channel.inboundCapacityMsat,
        "confirmationsRequired": channel.confirmationsRequired  as Any,
        "confirmations": channel.confirmations  as Any,
        "isOutbound": channel.isOutbound,
        "isChannelReady": channel.isChannelReady,
        "isUsable": channel.isUsable,
        "isPublic": channel.isPublic,
        "cltvExpiryDelta": channel.cltvExpiryDelta as Any
        
    ] as [String: Any]
}
