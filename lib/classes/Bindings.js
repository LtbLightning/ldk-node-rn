export class Address {
    constructor(hex) {
        this.addressHex = hex;
    }
}
export class PublicKey {
    constructor(hex) {
        this.keyHex = hex;
    }
}
export class ChannelId {
    constructor(hex) {
        this.channelIdHex = hex;
    }
}
export class UserChannelId {
    constructor(hex) {
        this.userChannelIdHex = hex;
    }
}
export class SocketAddr {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
    }
}
export class PeerDetails {
    constructor(nodeId, address, isConnected) {
        this.nodeId = nodeId;
        this.address = address;
        this.isConnected = isConnected;
    }
}
export class OutPoint {
    constructor(txid, vout) {
        this.txid = txid;
        this.vout = vout;
    }
}
export class ChannelDetails {
    constructor(channelId, counterpartyNodeId, fundingTxo, channelValueSatoshis, unspendablePunishmentReserve, userChannelId, balanceMsat, outboundCapacityMsat, inboundCapacityMsat, confirmationsRequired, confirmations, isOutbound, isChannelReady, isUsable, isPublic, cltvExpiryDelta) {
        this.channelId = channelId;
        this.counterpartyNodeId = counterpartyNodeId;
        this.fundingTxo = fundingTxo;
        this.channelValueSatoshis = channelValueSatoshis;
        this.unspendablePunishmentReserve = unspendablePunishmentReserve;
        this.userChannelId = userChannelId;
        this.balanceMsat = balanceMsat;
        this.outboundCapacityMsat = outboundCapacityMsat;
        this.inboundCapacityMsat = inboundCapacityMsat;
        this.confirmationsRequired = confirmationsRequired;
        this.confirmations = confirmations;
        this.isOutbound = isOutbound;
        this.isChannelReady = isChannelReady;
        this.isUsable = isUsable;
        this.isPublic = isPublic;
        this.cltvExpiryDelta = cltvExpiryDelta;
    }
}
//# sourceMappingURL=Bindings.js.map