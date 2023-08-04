import { ChannelDetails, NetAddress, PaymentDetails, PaymentDirection, PaymentStatus, PeerDetails } from './classes/Bindings';
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
/** Convert string to NetAddress */
export declare const stringToAddress: (addr: string) => NetAddress;
/**  Generate Entropy Mnemonic */
export declare const generateEntropyMnemonic: () => Promise<string>;
/** Create payment details object */
export declare const createPaymentDetails: (paymentDetails: any) => PaymentDetails;
