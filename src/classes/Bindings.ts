import { ChannelConfig } from './ChannelConfig';

export class Address {
  addressHex: string;

  constructor(hex: string) {
    this.addressHex = hex;
  }
}

export class PublicKey {
  keyHex: string;

  constructor(hex: string) {
    this.keyHex = hex;
  }
}
export class ChannelId {
  channelIdHex: string;

  constructor(hex: string) {
    this.channelIdHex = hex;
  }
}

export class UserChannelId {
  userChannelIdHex: string;

  constructor(hex: string) {
    this.userChannelIdHex = hex;
  }
}

export class NetAddress {
  ip: string;
  port: number;

  constructor(ip: string, port: number) {
    this.ip = ip;
    this.port = port;
  }
}

export class PeerDetails {
  nodeId: PublicKey;
  address: NetAddress;
  isConnected: boolean;

  constructor(nodeId: PublicKey, address: NetAddress, isConnected: boolean) {
    this.nodeId = nodeId;
    this.address = address;
    this.isConnected = isConnected;
  }
}

export class OutPoint {
  txid: string;
  vout: number;

  constructor(txid: string, vout: number) {
    this.txid = txid;
    this.vout = vout;
  }
}

export class ChannelDetails {
  channelId: ChannelId;
  counterpartyNodeId: PublicKey;
  fundingTxo?: OutPoint;
  channelValueSats: number;
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
  counterpartyUnspendablePunishmentReserve: number;
  counterpartyOutboundHtlcMinimumMsat?: number;
  counterpartyOutboundHtlcMaximumMsat?: number;
  counterpartyForwardingInfoFeeBaseMsat?: number;
  counterpartyForwardingInfoFeeProportionalMillionths?: number;
  counterpartyForwardingInfoCltvExpiryDelta?: number;
  nextOutboundHtlcLimitMsat: number;
  nextOutboundHtlcMinimumMsat: number;
  forceCloseSpendDelay?: number;
  inboundHtlcMinimumMsat?: number;
  inboundHtlcMaximumMsat?: number;
  config: ChannelConfig;

  constructor(
    channelId: ChannelId,
    counterpartyNodeId: PublicKey,
    fundingTxo: OutPoint,
    channelValueSats: number,
    unspendablePunishmentReserve: number,
    userChannelId: UserChannelId,
    balanceMsat: number,
    outboundCapacityMsat: number,
    inboundCapacityMsat: number,
    confirmationsRequired: number,
    confirmations: number,
    isOutbound: boolean,
    isChannelReady: boolean,
    isUsable: boolean,
    isPublic: boolean,
    cltvExpiryDelta: number,
    counterpartyUnspendablePunishmentReserve: number,
    counterpartyOutboundHtlcMinimumMsat: number,
    counterpartyOutboundHtlcMaximumMsat: number,
    counterpartyForwardingInfoFeeBaseMsat: number,
    counterpartyForwardingInfoFeeProportionalMillionths: number,
    counterpartyForwardingInfoCltvExpiryDelta: number,
    nextOutboundHtlcLimitMsat: number,
    nextOutboundHtlcMinimumMsat: number,
    forceCloseSpendDelay: number,
    inboundHtlcMinimumMsat: number,
    inboundHtlcMaximumMsat: number,
    config: string
  ) {
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
    this.counterpartyUnspendablePunishmentReserve = counterpartyUnspendablePunishmentReserve;
    this.counterpartyOutboundHtlcMinimumMsat = counterpartyOutboundHtlcMinimumMsat;
    this.counterpartyOutboundHtlcMaximumMsat = counterpartyOutboundHtlcMaximumMsat;
    this.counterpartyForwardingInfoFeeBaseMsat = counterpartyForwardingInfoFeeBaseMsat;
    this.counterpartyForwardingInfoFeeProportionalMillionths = counterpartyForwardingInfoFeeProportionalMillionths;
    this.counterpartyForwardingInfoCltvExpiryDelta = counterpartyForwardingInfoCltvExpiryDelta;
    this.nextOutboundHtlcLimitMsat = nextOutboundHtlcLimitMsat;
    this.nextOutboundHtlcMinimumMsat = nextOutboundHtlcMinimumMsat;
    this.forceCloseSpendDelay = forceCloseSpendDelay;
    this.inboundHtlcMinimumMsat = inboundHtlcMinimumMsat;
    this.inboundHtlcMaximumMsat = inboundHtlcMaximumMsat;
    this.config = new ChannelConfig().fromId(config);
  }
}

/**A bitcoin transaction hash/transaction ID. */
export class Txid {
  field0: string;

  constructor(feild0: string) {
    this.field0 = feild0;
  }
}

/**PaymentHash type, use to cross-lock hop */
export class PaymentHash {
  field0: string;

  constructor(feild0: string) {
    this.field0 = feild0;
  }
}

/** PaymentPreimage type, use to route payment between hop */
export class PaymentPreimage {
  field0: string;

  constructor(feild0: string) {
    this.field0 = feild0;
  }
}

/** Payment_secret type, use to authenticate sender to the receiver and tie MPP HTLCs together */
export class PaymentSecret {
  field0: string;

  constructor(feild0: string) {
    this.field0 = feild0;
  }
}

/**  Represents the current status of a payment. */
export enum PaymentStatus {
  // The payment is still pending.
  pending = 'pending',

  // The payment suceeded.
  succeeded = 'succeeded',

  // The payment failed.
  failed = 'failed',
}

/** Represents the direction of a payment. */
export enum PaymentDirection {
  // The payment is inbound.
  inbound = 'inbound',

  // The payment is outbound.
  outbound = 'outbound',
}

/** Represents a payment. */
export class PaymentDetails {
  // The payment hash, i.e., the hash of the `preimage`.
  hash: PaymentHash;

  // The pre-image used by the payment.
  preimage: PaymentPreimage;

  // The secret used by the payment.
  secret: PaymentSecret;

  // The amount transferred.
  amountMsat: number;

  // The direction of the payment.
  direction: PaymentDirection;

  // The status of the payment.
  status: PaymentStatus;

  constructor(
    hash: PaymentHash,
    preimage: PaymentPreimage,
    secret: PaymentSecret,
    amountMsat: number,
    direction: PaymentDirection,
    status: PaymentStatus
  ) {
    this.hash = hash;
    this.preimage = preimage;
    this.secret = secret;
    this.amountMsat = amountMsat;
    this.direction = direction;
    this.status = status;
  }
}

/** An enum representing the available verbosity levels of the logger. */
export enum LogLevel {
  // Designates extremely verbose information, including gossip-induced messages
  gossip = 'gossip',

  // Designates very low priority, often extremely verbose, information
  trace = 'trace',

  // Designates lower priority information
  debug = 'debug',

  // Designates useful information
  info = 'info',

  // Designates hazardous situations
  warn = 'warn',

  // Designates very serious errors
  error = 'error',
}
