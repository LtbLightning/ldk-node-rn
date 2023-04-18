import { NativeLoader } from './NativeLoader';
export class Node extends NativeLoader {
    /**
     * Create node id
     */
    constructor(id) {
        super();
        this.id = '';
        this.id = id;
    }
    /**
     * Start node
     * @returns {Promise<boolean>}
     */
    async start() {
        return this._ldk.start(this.id);
    }
    /**
     * Stop node
     * @returns {Promise<boolean>}
     */
    async stop() {
        return this._ldk.stop(this.id);
    }
    /**
     * Sync Wallets
     * @returns {Promise<boolean>}
     */
    async syncWallets() {
        return this._ldk.syncWallets(this.id);
    }
    /**
     * Get nodeId
     * @returns {Promise<string>}
     */
    async nodeId() {
        return this._ldk.nodeId(this.id);
    }
    /**
     * Get new funding address
     * @returns {Promise<string>}
     */
    async newFundingAddress() {
        return this._ldk.newFundingAddress(this.id);
    }
    /**
     * Get spendableOnchainBalanceSats
     * @returns {Promise<number>}
     */
    async spendableOnchainBalanceSats() {
        return await this._ldk.spendableOnchainBalanceSats(this.id);
    }
    /**
     * Get totalOnchainBalanceSats
     * @returns {Promise<number>}
     */
    async totalOnchainBalanceSats() {
        return await this._ldk.totalOnchainBalanceSats(this.id);
    }
    /**
     * Connect to another node
     * @requires [nodeId] publicKey of Node
     * @requires [address] IP:PORT of Node
     * @requires [permanently] open node permanently or not
     * @returns {Promise<boolean>}
     */
    async connect(nodeId, address, permanently) {
        return this._ldk.connect(this.id, nodeId, address, permanently);
    }
    /**
     * Disconnect from node
     * @requires [nodeId] publicKey of Node
     * @returns {Promise<boolean>}
     */
    async disconnect(nodeId) {
        return this._ldk.disconnect(this.id, nodeId);
    }
    /**
     * Node open channel
     * @requires [nodeId] publicKey of Node
     * @requires [address] IP:PORT of Node
     * @requires [channelAmountSats] number
     * @requires [pushToCounterpartyMsat] number
     * @requires [announceChannel] announceChannel or not
     * @returns {Promise<boolean>}
     */
    async connectOpenChannel(nodeId, address, channelAmountSats, pushToCounterpartyMsat, announceChannel) {
        return this._ldk.connectOpenChannel(this.id, nodeId, address, channelAmountSats, pushToCounterpartyMsat, announceChannel);
    }
    /**
     * Invoice to receive payment
     * @requires [amountMsat] amount in sats
     * @requires [description]
     * @requires [expirySecs] number
     * @returns {Promise<boolean>}
     */
    async receivePayment(amountMsat, description, expirySecs) {
        return this._ldk.receivePayment(this.id, amountMsat, description, expirySecs);
    }
}
//# sourceMappingURL=Node.js.map