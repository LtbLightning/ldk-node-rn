import { ChannelConfig } from "./ChannelConfig";
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
export class NetAddress {
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
    constructor(channelId, counterpartyNodeId, fundingTxo, channelValueSats, unspendablePunishmentReserve, userChannelId, balanceMsat, outboundCapacityMsat, inboundCapacityMsat, confirmationsRequired, confirmations, isOutbound, isChannelReady, isUsable, isPublic, cltvExpiryDelta, counterpartyUnspendablePunishmentReserve, counterpartyOutboundHtlcMinimumMsat, counterpartyOutboundHtlcMaximumMsat, counterpartyForwardingInfoFeeBaseMsat, counterpartyForwardingInfoFeeProportionalMillionths, counterpartyForwardingInfoCltvExpiryDelta, nextOutboundHtlcLimitMsat, nextOutboundHtlcMinimumMsat, forceCloseSpendDelay, inboundHtlcMinimumMsat, inboundHtlcMaximumMsat, config) {
        this.channelId = channelId;
        this.counterpartyNodeId = counterpartyNodeId;
        this.fundingTxo = fundingTxo;
        this.channelValueSats = channelValueSats;
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
        this.counterpartyUnspendablePunishmentReserve =
            counterpartyUnspendablePunishmentReserve;
        this.counterpartyOutboundHtlcMinimumMsat =
            counterpartyOutboundHtlcMinimumMsat;
        this.counterpartyOutboundHtlcMaximumMsat =
            counterpartyOutboundHtlcMaximumMsat;
        this.counterpartyForwardingInfoFeeBaseMsat =
            counterpartyForwardingInfoFeeBaseMsat;
        this.counterpartyForwardingInfoFeeProportionalMillionths =
            counterpartyForwardingInfoFeeProportionalMillionths;
        this.counterpartyForwardingInfoCltvExpiryDelta =
            counterpartyForwardingInfoCltvExpiryDelta;
        this.nextOutboundHtlcLimitMsat = nextOutboundHtlcLimitMsat;
        this.nextOutboundHtlcMinimumMsat = nextOutboundHtlcMinimumMsat;
        this.forceCloseSpendDelay = forceCloseSpendDelay;
        this.inboundHtlcMinimumMsat = inboundHtlcMinimumMsat;
        this.inboundHtlcMaximumMsat = inboundHtlcMaximumMsat;
        this.config = new ChannelConfig(config);
    }
}
/**A bitcoin transaction hash/transaction ID. */
export class Txid {
    constructor(feild0) {
        this.field0 = feild0;
    }
}
/**PaymentHash type, use to cross-lock hop */
export class PaymentHash {
    constructor(feild0) {
        this.field0 = feild0;
    }
}
/** PaymentPreimage type, use to route payment between hop */
export class PaymentPreimage {
    constructor(feild0) {
        this.field0 = feild0;
    }
}
/** Payment_secret type, use to authenticate sender to the receiver and tie MPP HTLCs together */
export class PaymentSecret {
    constructor(feild0) {
        this.field0 = feild0;
    }
}
/**  Represents the current status of a payment. */
export var PaymentStatus;
(function (PaymentStatus) {
    // The payment is still pending.
    PaymentStatus["pending"] = "pending";
    // The payment suceeded.
    PaymentStatus["succeeded"] = "succeeded";
    // The payment failed.
    PaymentStatus["failed"] = "failed";
})(PaymentStatus || (PaymentStatus = {}));
/** Represents the direction of a payment. */
export var PaymentDirection;
(function (PaymentDirection) {
    // The payment is inbound.
    PaymentDirection["inbound"] = "inbound";
    // The payment is outbound.
    PaymentDirection["outbound"] = "outbound";
})(PaymentDirection || (PaymentDirection = {}));
/** Represents a payment. */
export class PaymentDetails {
    constructor(hash, preimage, secret, amountMsat, direction, status) {
        this.hash = hash;
        this.preimage = preimage;
        this.secret = secret;
        this.amountMsat = amountMsat;
        this.direction = direction;
        this.status = status;
    }
}
/** An enum representing the available verbosity levels of the logger. */
export var LogLevel;
(function (LogLevel) {
    // Designates extremely verbose information, including gossip-induced messages
    LogLevel["gossip"] = "gossip";
    // Designates very low priority, often extremely verbose, information
    LogLevel["trace"] = "trace";
    // Designates lower priority information
    LogLevel["debug"] = "debug";
    // Designates useful information
    LogLevel["info"] = "info";
    // Designates hazardous situations
    LogLevel["warn"] = "warn";
    // Designates very serious errors
    LogLevel["error"] = "error";
})(LogLevel || (LogLevel = {}));
//# sourceMappingURL=Bindings.js.map