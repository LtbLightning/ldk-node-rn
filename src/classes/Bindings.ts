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
    cltvExpiryDelta: number
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

//Options which apply on a per-channel basis and may change at runtime or based on negotiation with our counterparty.
export class ChannelConfig {
  //Amount (in millionths of a satoshi) charged per satoshi for payments forwarded outbound over the channel. This may be allowed to change at runtime in a later update, however doing so must result in update messages sent to notify all nodes of our updated relay fee.
  //
  //Default value: 0.
  forwardingFeeProportionalMillionths: number;

  // Amount (in milli-satoshi) charged for payments forwarded outbound over the channel, in excess of forwardingFeeProportionalMillionths. This may be allowed to change at runtime in a later update, however doing so must result in update messages sent to notify all nodes of our updated relay fee.
  //
  // The default value of a single satoshi roughly matches the market rate on many routing nodes as of July 2021. Adjusting it upwards or downwards may change whether nodes route through this node.
  //
  //Default value: 1000.
  forwardingFeeBaseMsat: number;

  //The difference in the CLTV value between incoming HTLCs and an outbound HTLC forwarded over the channel this config applies to.
  //
  // Thus, for HTLC-encumbered balances to be enforced on-chain when a channel is force-closed, we (or one of our watchtowers) MUST be online to check for broadcast of the current commitment transaction at least once per this many blocks (minus some margin to allow us enough time to broadcast and confirm a transaction, possibly with time in between to RBF the spending transaction).
  //
  // Default value: 72 (12 hours at an average of 6 blocks/hour). Minimum value: MIN_CLTV_EXPIRY_DELTA, any values less than this will be treated as MIN_CLTV_EXPIRY_DELTA instead.
  cltvExpiryDelta: number;

  //Limit our total exposure to in-flight HTLCs which are burned to fees as they are too small to claim on-chain.
  //
  // When an HTLC present in one of our channels is below a “dust” threshold, the HTLC will not be claimable on-chain, instead being turned into additional miner fees if either party force-closes the channel. Because the threshold is per-HTLC, our total exposure to such payments may be sustantial if there are many dust HTLCs present when the channel is force-closed.
  //
  // The dust threshold for each HTLC is based on the dustLimitSatoshis for each party in a channel negotiated throughout the channel open process, along with the fees required to have a broadcastable HTLC spending transaction. When a channel supports anchor outputs (specifically the zero fee HTLC transaction variant), this threshold no longer takes into account the HTLC transaction fee as it is zero.
  //
  // This limit is applied for sent, forwarded, and received HTLCs and limits the total exposure across all three types per-channel. Setting this too low may prevent the sending or receipt of low-value HTLCs on high-traffic nodes, and this limit is very important to prevent stealing of dust HTLCs by miners.
  maxDustHtlcExposureMsat: number;

  //The additional fee we’re willing to pay to avoid waiting for the counterparty’s toSelfDelay to reclaim funds.
  //
  // When we close a channel cooperatively with our counterparty, we negotiate a fee for the closing transaction which both sides find acceptable, ultimately paid by the channel funder/initiator.
  //
  // When we are the funder, because we have to pay the channel closing fee, we bound the acceptable fee by our Background and Normal fees, with the upper bound increased by this value. Because the on-chain fee we’d pay to force-close the channel is kept near our Normal feerate during normal operation, this value represents the additional fee we’re willing to pay in order to avoid waiting for our counterparty’s toSelfDelay to reclaim our funds.
  //
  // When we are not the funder, we require the closing transaction fee pay at least our Background fee estimate, but allow our counterparty to pay as much fee as they like. Thus, this value is ignored when we are not the funder.
  //
  // Default value: 1000 satoshis.
  forceCloseAvoidanceMaxFeeSatoshis: number;

  constructor(
    forwardingFeeProportionalMillionths: number,
    forwardingFeeBaseMsat: number,
    cltvExpiryDelta: number,
    maxDustHtlcExposureMsat: number,
    forceCloseAvoidanceMaxFeeSatoshis: number
  ) {
    this.forwardingFeeProportionalMillionths = forwardingFeeProportionalMillionths;
    this.forwardingFeeBaseMsat = forwardingFeeBaseMsat;
    this.cltvExpiryDelta = cltvExpiryDelta;
    this.maxDustHtlcExposureMsat = maxDustHtlcExposureMsat;
    this.forceCloseAvoidanceMaxFeeSatoshis = forceCloseAvoidanceMaxFeeSatoshis;
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
