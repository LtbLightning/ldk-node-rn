import { Address, PublicKey } from './Bindings';
import { NativeLoader } from './NativeLoader';
export declare class Node extends NativeLoader {
    id: string;
    /**
     * Create node id
     */
    constructor(id: string);
    /**
     * Start node
     * @returns {Promise<boolean>}
     */
    start(): Promise<boolean>;
    /**
     * Stop node
     * @returns {Promise<boolean>}
     */
    stop(): Promise<boolean>;
    /**
     * Sync Wallets
     * @returns {Promise<boolean>}
     */
    syncWallets(): Promise<boolean>;
    /**
     * Get nodeId
     * @returns {Promise<PublicKey>}
     */
    nodeId(): Promise<PublicKey>;
    /**
     * Get new funding address
     * @returns {Promise<Address>}
     */
    newFundingAddress(): Promise<Address>;
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
     * Connect to another node
     * @requires [nodeId] publicKey of Node
     * @requires [address] IP:PORT of Node
     * @requires [permanently] open node permanently or not
     * @returns {Promise<boolean>}
     */
    connect(nodeId: string, address: string, permanently: boolean): Promise<boolean>;
    /**
     * Disconnect from node
     * @requires [nodeId] publicKey of Node
     * @returns {Promise<boolean>}
     */
    disconnect(nodeId: string): Promise<boolean>;
    /**
     * Node open channel
     * @requires [nodeId] publicKey of Node
     * @requires [address] IP:PORT of Node
     * @requires [channelAmountSats] number
     * @requires [pushToCounterpartyMsat] number
     * @requires [announceChannel] announceChannel or not
     * @returns {Promise<boolean>}
     */
    connectOpenChannel(nodeId: string, address: string, channelAmountSats: number, pushToCounterpartyMsat: number, announceChannel: boolean): Promise<boolean>;
    /**
     * Send payment to invoice
     * @requires [invoice]
     * @returns {Promise<boolean>}
     */
    sendPayment(invoice: string): Promise<string>;
    /**
     * Invoice to receive payment
     * @requires [amountMsat] amount in sats
     * @requires [description]
     * @requires [expirySecs] number
     * @returns {Promise<boolean>}
     */
    receivePayment(amountMsat: number, description: string, expirySecs: number): Promise<string>;
}
