import { Address, PublicKey } from './Bindings';
import { NativeLoader } from './NativeLoader';

export class Node extends NativeLoader {
  id: string = '';

  /**
   * Create node id
   */
  constructor(id: string) {
    super();
    this.id = id;
  }

  /**
   * Start node
   * @returns {Promise<boolean>}
   */
  async start(): Promise<boolean> {
    return await this._ldk.start(this.id);
  }

  /**
   * Stop node
   * @returns {Promise<boolean>}
   */
  async stop(): Promise<boolean> {
    return await this._ldk.stop(this.id);
  }

  /**
   * Sync Wallets
   * @returns {Promise<boolean>}
   */
  async syncWallets(): Promise<boolean> {
    return await this._ldk.syncWallets(this.id);
  }

  /**
   * Get nodeId
   * @returns {Promise<PublicKey>}
   */
  async nodeId(): Promise<PublicKey> {
    let keyHex = await this._ldk.nodeId(this.id);
    return new PublicKey(keyHex);
  }

  /**
   * Get new funding address
   * @returns {Promise<Address>}
   */
  async newFundingAddress(): Promise<Address> {
    let hex = await this._ldk.newFundingAddress(this.id);
    return new Address(hex);
  }

  /**
   * Get spendableOnchainBalanceSats
   * @returns {Promise<number>}
   */
  async spendableOnchainBalanceSats(): Promise<number> {
    return await this._ldk.spendableOnchainBalanceSats(this.id);
  }

  /**
   * Get totalOnchainBalanceSats
   * @returns {Promise<number>}
   */
  async totalOnchainBalanceSats(): Promise<number> {
    return await this._ldk.totalOnchainBalanceSats(this.id);
  }

  /**
   * Connect to another node
   * @requires [nodeId] publicKey of Node
   * @requires [address] IP:PORT of Node
   * @requires [permanently] open node permanently or not
   * @returns {Promise<boolean>}
   */
  async connect(nodeId: string, address: string, permanently: boolean): Promise<boolean> {
    return await this._ldk.connect(this.id, nodeId, address, permanently);
  }

  /**
   * Disconnect from node
   * @requires [nodeId] publicKey of Node
   * @returns {Promise<boolean>}
   */
  async disconnect(nodeId: string): Promise<boolean> {
    return await this._ldk.disconnect(this.id, nodeId);
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
  async connectOpenChannel(
    nodeId: string,
    address: string,
    channelAmountSats: number,
    pushToCounterpartyMsat: number,
    announceChannel: boolean
  ): Promise<boolean> {
    return await this._ldk.connectOpenChannel(
      this.id,
      nodeId,
      address,
      channelAmountSats,
      pushToCounterpartyMsat,
      announceChannel
    );
  }

  /**
   * Send payment to invoice
   * @requires [invoice]
   * @returns {Promise<boolean>}
   */
  async sendPayment(invoice: string): Promise<string> {
    return await this._ldk.sendPayment(this.id, invoice);
  }

  /**
   * Invoice to receive payment
   * @requires [amountMsat] amount in sats
   * @requires [description]
   * @requires [expirySecs] number
   * @returns {Promise<boolean>}
   */
  async receivePayment(amountMsat: number, description: string, expirySecs: number): Promise<string> {
    return await this._ldk.receivePayment(this.id, amountMsat, description, expirySecs);
  }
}
