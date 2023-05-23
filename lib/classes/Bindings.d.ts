export declare class Address {
    addressHex: string;
    constructor(hex: string);
}
export declare class PublicKey {
    keyHex: string;
    constructor(hex: string);
}
export declare class ChannelId {
    channelIdHex: string;
    constructor(hex: string);
}
export declare class UserChannelId {
    userChannelIdHex: string;
    constructor(hex: string);
}
export declare class SocketAddr {
    ip: string;
    port: number;
    constructor(ip: string, port: number);
}
export declare class PeerDetails {
    nodeId: PublicKey;
    address: SocketAddr;
    isConnected: boolean;
    constructor(nodeId: PublicKey, address: SocketAddr, isConnected: boolean);
}
export declare class OutPoint {
    txid: string;
    vout: number;
    constructor(txid: string, vout: number);
}
export declare class ChannelDetails {
    channelId: ChannelId;
    counterpartyNodeId: PublicKey;
    fundingTxo?: OutPoint;
    channelValueSatoshis: number;
    unspendablePunishmentReserve?: number;
    userChannelId: UserChannelId;
    balanceMsat: number;
    outboundCapacityMsat: number;
    inboundCapacityMsat: number;
    confirmationsRequired?: number;
    confirmations?: number;
    isOutbound: boolean;
    isChannelReady: boolean;
    isUsable: boolean;
    isPublic: boolean;
    cltvExpiryDelta?: number;
    constructor(channelId: ChannelId, counterpartyNodeId: PublicKey, fundingTxo: OutPoint, channelValueSatoshis: number, unspendablePunishmentReserve: number, userChannelId: UserChannelId, balanceMsat: number, outboundCapacityMsat: number, inboundCapacityMsat: number, confirmationsRequired: number, confirmations: number, isOutbound: boolean, isChannelReady: boolean, isUsable: boolean, isPublic: boolean, cltvExpiryDelta: number);
}
