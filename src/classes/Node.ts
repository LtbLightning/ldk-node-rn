import { createChannelDetailsObject, createPeerDetailsObject } from '../utils';
import { Address, ChannelDetails, PeerDetails, PublicKey } from './Bindings';
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
   * Starts the necessary background tasks, such as handling events coming from user input, LDK/BDK, and the peer-to-peer network.
   *
   * After this returns, the [Node] instance can be controlled via the provided API methods in a thread-safe manner.
   *
   * @returns {Promise<boolean>}
   */
  async start(): Promise<boolean> {
    return await this._ldk.start(this.id);
  }

  /**
   * Disconnects all peers, stops all running background tasks, and shuts down [Node].
   *
   * After this returns most API methods will throw NotRunning Exception.
   * @returns {Promise<boolean>}
   */
  async stop(): Promise<boolean> {
    return await this._ldk.stop(this.id);
  }

  /**
   * Sync the LDK and BDK wallets with the current chain state.
   * @returns {Promise<boolean>}
   */
  async syncWallets(): Promise<boolean> {
    return await this._ldk.syncWallets(this.id);
  }

  /**
   * Returns our own node id
   * @returns {Promise<PublicKey>}
   */
  async nodeId(): Promise<PublicKey> {
    let keyHex = await this._ldk.nodeId(this.id);
    return new PublicKey(keyHex);
  }

  /**
   * Retrieve a new on-chain/funding address.
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
   * Connect to a node on the peer-to-peer network.
   *
   * If `permanently` is set to `true`, we'll remember the peer and reconnect to it on restart.
   *
   * @requires [nodeId] publicKey of Node
   * @requires [address] IP:PORT of Node
   * @requires [permanently] open node permanently or not
   * @returns {Promise<boolean>}
   */
  async connect(nodeId: string, address: string, permanently: boolean): Promise<boolean> {
    return await this._ldk.connect(this.id, nodeId, address, permanently);
  }

  /**
   * Disconnects the peer with the given node id.
   *
   * Will also remove the peer from the peer store, i.e., after this has been called we won't try to reconnect on restart.
   *
   * @requires [nodeId] publicKey of Node
   * @returns {Promise<boolean>}
   */
  async disconnect(nodeId: string): Promise<boolean> {
    return await this._ldk.disconnect(this.id, nodeId);
  }

  /**
   * Connect to a node and open a new channel. Disconnects and re-connects are handled automatically
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
   * Send a payement given an invoice.
   * @requires [invoice]
   * @returns {Promise<boolean>}
   */
  async sendPayment(invoice: string): Promise<string> {
    return await this._ldk.sendPayment(this.id, invoice);
  }

  /**
   * Send a payment given an invoice and an amount in millisatoshi.
   * This will fail if the amount given is less than the value required by the given invoice.
   *
   * This can be used to pay a so - called "zero-amount" invoice, i.e., an invoice that leaves the
   * amount paid to be determined by the user.
   *
   * @requires [invoice]
   * @requires [amountMsat]
   * @returns {Promise<boolean>}
   */
  async sendPaymentUsingAmount(invoice: string, amountMsat: number): Promise<string> {
    return await this._ldk.sendPaymentUsingAmount(this.id, invoice, amountMsat);
  }

  /**
   * Send a spontaneous, aka. "keysend", payment
   * @requires [invoice]
   * @requires [amountMsat]
   * @returns {Promise<boolean>}
   */
  async sendSpontaneousPayment(amountMsat: number, nodeId: PublicKey): Promise<string> {
    return await this._ldk.sendSpontaneousPayment(this.id, amountMsat, nodeId.keyHex);
  }

  /**
   * Returns a payable invoice that can be used to request and receive a payment of the amount given.
   * @requires [amountMsat] amount in sats
   * @requires [description]
   * @requires [expirySecs] number
   * @returns {Promise<boolean>}
   */
  async receivePayment(amountMsat: number, description: string, expirySecs: number): Promise<string> {
    return await this._ldk.receivePayment(this.id, amountMsat, description, expirySecs);
  }

  /**
   * Returns a payable invoice that can be used to request and receive a payment for which the amount is to be determined by the user, also known as a "zero-amount" invoice.
   * @requires [description]
   * @requires [expirySecs] number
   * @returns {Promise<boolean>}
   */
  async receiveVariableAmountPayment(description: string, expirySecs: number): Promise<string> {
    return await this._ldk.receiveVariableAmountPayment(this.id, description, expirySecs);
  }

  /**
   * Get list of connected peers
   * @returns {Promise<Array<PeerDetails>>}
   */
  async listPeers(): Promise<Array<PeerDetails>> {
    const peersList = await this._ldk.listPeers(this.id);
    return peersList.map((item) => createPeerDetailsObject(item));
  }

  /**
   * Get list of opened channels
   * @returns {Promise<Array<ChannelDetails>>}
   */
  async listChannels(): Promise<Array<ChannelDetails>> {
    const channelsList = await this._ldk.listChannels(this.id);
    return channelsList.map((item) => createChannelDetailsObject(item));
  }
}
