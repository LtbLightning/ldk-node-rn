import {
  Address,
  ChannelDetails,
  ChannelId,
  OutPoint,
  PeerDetails,
  PublicKey,
  SocketAddr,
  UserChannelId,
} from './classes/Bindings';

/** Create PeerDetails object */
export const createPeerDetailsObject = (item: any): PeerDetails => {
  let address = item.address.split(':');
  return new PeerDetails(new PublicKey(item.nodeId), new SocketAddr(address[0], address[1]), item.isConnected);
};

/** Create ChannelDetails object */
export const createChannelDetailsObject = (item: any): ChannelDetails => {
  return new ChannelDetails(
    new ChannelId(item.channelId),
    new PublicKey(item.counterpartyNodeId),
    new OutPoint(item.fundingTxo?.txid, item.fundingTxo?.vout),
    item.channelValueSatoshis,
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
