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
/**A bitcoin transaction hash/transaction ID. */
export declare class Txid {
    field0: string;
    constructor(feild0: string);
}
/**PaymentHash type, use to cross-lock hop */
export declare class PaymentHash {
    field0: string;
    constructor(feild0: string);
}
/** PaymentPreimage type, use to route payment between hop */
export declare class PaymentPreimage {
    field0: string;
    constructor(feild0: string);
}
/** Payment_secret type, use to authenticate sender to the receiver and tie MPP HTLCs together */
export declare class PaymentSecret {
    field0: string;
    constructor(feild0: string);
}
/**  Represents the current status of a payment. */
export declare enum PaymentStatus {
    pending = "pending",
    succeeded = "succeeded",
    failed = "failed"
}
/** Represents the direction of a payment. */
export declare enum PaymentDirection {
    inbound = "inbound",
    outbound = "outbound"
}
/** Represents a payment. */
export declare class PaymentDetails {
    hash: PaymentHash;
    preimage: PaymentPreimage;
    secret: PaymentSecret;
    amountMsat: number;
    direction: PaymentDirection;
    status: PaymentStatus;
    constructor(hash: PaymentHash, preimage: PaymentPreimage, secret: PaymentSecret, amountMsat: number, direction: PaymentDirection, status: PaymentStatus);
}