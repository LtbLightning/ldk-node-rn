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

export class SocketAddr {
  ip: string;
  port: number;

  constructor(ip: string, port: number) {
    this.ip = ip;
    this.port = port;
  }
}

export class PeerDetails {
  nodeId: PublicKey;
  address: SocketAddr;
  isConnected: boolean;

  constructor(nodeId: PublicKey, address: SocketAddr, isConnected: boolean) {
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

  constructor(
    channelId: ChannelId,
    counterpartyNodeId: PublicKey,
    fundingTxo: OutPoint,
    channelValueSatoshis: number,
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
