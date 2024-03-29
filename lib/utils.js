import { ChannelDetails, ChannelId, NetAddress, OutPoint, PaymentDetails, PaymentDirection, PaymentHash, PaymentPreimage, PaymentSecret, PaymentStatus, PeerDetails, PublicKey, UserChannelId, } from "./classes/Bindings";
import { NativeLoader } from "./classes/NativeLoader";
/** Create PeerDetails object */
export const createPeerDetailsObject = (item) => {
    let address = item.address.split(":");
    return new PeerDetails(new PublicKey(item.nodeId), new NetAddress(address[0], address[1]), item.isConnected);
};
/** Create ChannelDetails object */
export const createChannelDetailsObject = (item) => {
    var _a, _b;
    return new ChannelDetails(new ChannelId(item.channelId), new PublicKey(item.counterpartyNodeId), new OutPoint((_a = item.fundingTxo) === null || _a === void 0 ? void 0 : _a.txid, (_b = item.fundingTxo) === null || _b === void 0 ? void 0 : _b.vout), item.channelValueSats, item.unspendablePunishmentReserve, new UserChannelId(item.userChannelId), item.balanceMsat, item.outboundCapacityMsat, item.inboundCapacityMsat, item.confirmationsRequired, item.confirmations, item.isOutbound, item.isChannelReady, item.isUsable, item.isPublic, item.cltvExpiryDelta, item.counterpartyUnspendablePunishmentReserve, item.counterpartyOutboundHtlcMinimumMsat, item.counterpartyOutboundHtlcMaximumMsat, item.counterpartyForwardingInfoFeeBaseMsat, item.counterpartyForwardingInfoFeeProportionalMillionths, item.counterpartyForwardingInfoCltvExpiryDelta, item.nextOutboundHtlcLimitMsat, item.nextOutboundHtlcMinimumMsat, item.forceCloseSpendDelay, item.inboundHtlcMinimumMsat, item.inboundHtlcMaximumMsatm, item.config);
};
/** Get payment direction enum */
export const getPaymentDirection = (direction) => direction === "inbound"
    ? PaymentDirection.inbound
    : PaymentDirection.outbound;
/** Get payment status enum */
export const getPaymentStatus = (status) => {
    let statusEnum = PaymentStatus.pending;
    switch (status) {
        case "succeeded":
            statusEnum = PaymentStatus.succeeded;
            break;
        case "failed":
            statusEnum = PaymentStatus.failed;
            break;
    }
    return statusEnum;
};
/** Convert NetAddress object to URL */
export const addressToString = (addr) => `${addr.ip}:${addr.port}`;
/** Convert string to NetAddress */
export const stringToAddress = (addr) => {
    let splittedAddress = addr.split(":");
    return new NetAddress(splittedAddress[0], parseInt(splittedAddress[1]));
};
/**  Generate Entropy Mnemonic */
export const generateEntropyMnemonic = async () => new NativeLoader()._ldk.createEntropyMnemonic();
/** Create payment details object */
export const createPaymentDetails = (paymentDetails) => new PaymentDetails(new PaymentHash(paymentDetails.hash), new PaymentPreimage(paymentDetails.preimage), new PaymentSecret(paymentDetails.secret), paymentDetails.amountMsat, getPaymentDirection(paymentDetails.direction), getPaymentStatus(paymentDetails.status));
//# sourceMappingURL=utils.js.map