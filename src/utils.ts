import {
  ChannelDetails,
  ChannelId,
  NetAddress,
  OutPoint,
  PaymentDetails,
  PaymentDirection,
  PaymentHash,
  PaymentPreimage,
  PaymentSecret,
  PaymentStatus,
  PeerDetails,
  PublicKey,
  UserChannelId,
} from './classes/Bindings';

import { NativeLoader } from './classes/NativeLoader';

/** Create PeerDetails object */
export const createPeerDetailsObject = (item: any): PeerDetails => {
  let address = item.address.split(':');
  return new PeerDetails(new PublicKey(item.nodeId), new NetAddress(address[0], address[1]), item.isConnected);
};

/** Create ChannelDetails object */
export const createChannelDetailsObject = (item: any): ChannelDetails => {
  return new ChannelDetails(
    new ChannelId(item.channelId),
    new PublicKey(item.counterpartyNodeId),
    new OutPoint(item.fundingTxo?.txid, item.fundingTxo?.vout),
    item.channelValueSats,
    item.unspendablePunishmentReserve,
    new UserChannelId(item.userChannelId),
    item.balanceMsat,
    item.outboundCapacityMsat,
    item.inboundCapacityMsat,
    item.confirmationsRequired,
    item.confirmations,
    item.isOutbound,
    item.isChannelReady,
    item.isUsable,
    item.isPublic,
    item.cltvExpiryDelta
  );
};

/** Get payment direction enum */
export const getPaymentDirection = (direction: string): PaymentDirection =>
  direction === 'inbound' ? PaymentDirection.inbound : PaymentDirection.outbound;

/** Get payment status enum */
export const getPaymentStatus = (status: string): PaymentStatus => {
  let statusEnum = PaymentStatus.pending;
  switch (status) {
    case 'succeeded':
      statusEnum = PaymentStatus.succeeded;
      break;
    case 'failed':
      statusEnum = PaymentStatus.failed;
      break;
  }
  return statusEnum;
};

/** Convert NetAddress object to URL */
export const addressToString = (addr: NetAddress) => `${addr.ip}:${addr.port}`;

/** Convert string to NetAddress */
export const stringToAddress = (addr: string) => {
  let splittedAddress = addr.split(':');
  return new NetAddress(splittedAddress[0], parseInt(splittedAddress[1]));
};

/**  Generate Entropy Mnemonic */
export const generateEntropyMnemonic = async () => new NativeLoader()._ldk.createEntropyMnemonic();

/** Create payment details object */
export const createPaymentDetails = (paymentDetails: any) =>
  new PaymentDetails(
    new PaymentHash(paymentDetails.hash),
    new PaymentPreimage(paymentDetails.preimage),
    new PaymentSecret(paymentDetails.secret),
    paymentDetails.amountMsat,
    getPaymentDirection(paymentDetails.direction),
    getPaymentStatus(paymentDetails.status)
  );
