import { ChannelDetails, NetAddress, PaymentDirection, PaymentStatus, PeerDetails } from './classes/Bindings';
/** Create PeerDetails object */
export declare const createPeerDetailsObject: (item: any) => PeerDetails;
/** Create ChannelDetails object */
export declare const createChannelDetailsObject: (item: any) => ChannelDetails;
/** Get payment direction enum */
export declare const getPaymentDirection: (direction: string) => PaymentDirection;
/** Get payment status enum */
export declare const getPaymentStatus: (status: string) => PaymentStatus;
/** Convert NetAddress object to URL */
export declare const addressToString: (addr: NetAddress) => string;
