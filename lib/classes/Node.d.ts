import { Address, ChannelDetails, PaymentDetails, PaymentHash, PeerDetails, PublicKey, Txid } from './Bindings';
import { NativeLoader } from './NativeLoader';
export declare class Node extends NativeLoader {
    id: string;
    /**
     * Create node id
     */
    constructor(id: string);
    /**
     * Starts the necessary background tasks, such as handling events coming from user input, LDK/BDK, and the peer-to-peer network.
     *
     * After this returns, the [Node] instance can be controlled via the provided API methods in a thread-safe manner.
     *
     * @returns {Promise<boolean>}
     */
    start(): Promise<boolean>;
    /**
     * Disconnects all peers, stops all running background tasks, and shuts down [Node].
     *
     * After this returns most API methods will throw NotRunning Exception.
     * @returns {Promise<boolean>}
     */
    stop(): Promise<boolean>;
    /**
     * Sync the LDK and BDK wallets with the current chain state.
     * @returns {Promise<boolean>}
     */
    syncWallets(): Promise<boolean>;
    /**
     * Returns our own node id
     * @returns {Promise<PublicKey>}
     */
    nodeId(): Promise<PublicKey>;
    /**
     * Retrieve a new on-chain/funding address.
     * @returns {Promise<Address>}
     */
    newFundingAddress(): Promise<Address>;
    /**
     * Send an on-chain payment to the given address.
     * @requires [address] address of Node
     * @requires [amountMsat] amount in milli sats
     * @returns {Promise<TxId>}
     */
    sendToOnchainAddress(address: Address, amountMsat: number): Promise<Txid>;
    /**
     * Send an on-chain payment to the given address, draining all the available funds.
     * @requires [address] address of Node
     * @returns {Promise<TxId>}
     */
    sendAllToOnchainAddress(address: Address): Promise<Txid>;
    /**
     * Get spendableOnchainBalanceSats
     * @returns {Promise<number>}
     */
    spendableOnchainBalanceSats(): Promise<number>;
    /**
     * Get totalOnchainBalanceSats
     * @returns {Promise<number>}
     */
    totalOnchainBalanceSats(): Promise<number>;
    /**
     * Connect to a node on the peer-to-peer network.
     *
     * If `permanently` is set to `true`, we'll remember the peer and reconnect to it on restart.
     *
     * @requires [nodeId] publicKey of Node
     * @requires [address] IP:PORT of Node
     * @requires [permanently] open node permanently or not
     * @returns {Promise<boolean>}
     */
    connect(nodeId: string, address: string, permanently: boolean): Promise<boolean>;
    /**
     * Disconnects the peer with the given node id.
     *
     * Will also remove the peer from the peer store, i.e., after this has been called we won't try to reconnect on restart.
     *
     * @requires [nodeId] publicKey of Node
     * @returns {Promise<boolean>}
     */
    disconnect(nodeId: string): Promise<boolean>;
    /**
     * Connect to a node and open a new channel. Disconnects and re-connects are handled automatically
     * @requires [nodeId] publicKey of Node
     * @requires [address] IP:PORT of Node
     * @requires [channelAmountSats] number
     * @requires [pushToCounterpartyMsat] number
     * @requires [announceChannel] announceChannel or not
     * @returns {Promise<boolean>}
     */
    connectOpenChannel(nodeId: string, address: string, channelAmountSats: number, pushToCounterpartyMsat: number, announceChannel: boolean): Promise<boolean>;
    /**
     * Send a payement given an invoice.
     * @requires [invoice]
     * @returns {Promise<PaymentHash>}
     */
    sendPayment(invoice: string): Promise<PaymentHash>;
    /**
     * Send a payment given an invoice and an amount in millisatoshi.
     * This will fail if the amount given is less than the value required by the given invoice.
     *
     * This can be used to pay a so - called "zero-amount" invoice, i.e., an invoice that leaves the
     * amount paid to be determined by the user.
     *
     * @requires [invoice]
     * @requires [amountMsat]
     * @returns {Promise<PaymentHash>}
     */
    sendPaymentUsingAmount(invoice: string, amountMsat: number): Promise<PaymentHash>;
    /**
     * Send a spontaneous, aka. "keysend", payment
     * @requires [invoice]
     * @requires [amountMsat]
     * @returns {Promise<PaymentHash>}
     */
    sendSpontaneousPayment(amountMsat: number, nodeId: PublicKey): Promise<PaymentHash>;
    /**
     * Returns a payable invoice that can be used to request and receive a payment of the amount given.
     * @requires [amountMsat] amount in sats
     * @requires [description]
     * @requires [expirySecs] number
     * @returns {Promise<boolean>}
     */
    receivePayment(amountMsat: number, description: string, expirySecs: number): Promise<string>;
    /**
     * Returns a payable invoice that can be used to request and receive a payment for which the amount is to be determined by the user, also known as a "zero-amount" invoice.
     * @requires [description]
     * @requires [expirySecs] number
     * @returns {Promise<boolean>}
     */
    receiveVariableAmountPayment(description: string, expirySecs: number): Promise<string>;
    /**
     * Get list of connected peers
     * @returns {Promise<Array<PeerDetails>>}
     */
    listPeers(): Promise<Array<PeerDetails>>;
    /**
     * Get list of opened channels
     * @returns {Promise<Array<ChannelDetails>>}
     */
    listChannels(): Promise<Array<ChannelDetails>>;
    /**
     * Get payment details of from paymentHash
     * @returns {Promise<PaymentDetails>}
     */
    payment(paymetHash: PaymentHash): Promise<PaymentDetails>;
    /**
     * Remove payment from paymentHash
     * @returns {Promise<boolean>*/
    removePayment(paymetHash: PaymentHash): Promise<boolean>;
}
