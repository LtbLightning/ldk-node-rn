import {
  Address,
  ChannelConfig,
  ChannelDetails,
  ChannelId,
  NetAddress,
  PaymentDetails,
  PaymentHash,
  PeerDetails,
  PublicKey,
  Txid,
} from './Bindings';
import {
  addressToString,
  createChannelDetailsObject,
  createPaymentDetails,
  createPeerDetailsObject,
  stringToAddress,
} from '../utils';

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
   * Returns listening Address
   * @returns {Promise<NetAddress>}
   */
  async listeningAddress(): Promise<NetAddress | null> {
    let addr = await this._ldk.listeningAddress(this.id);
    return addr == undefined ? null : stringToAddress(addr);
  }

  /**
   * Retrieve a new on-chain/funding address.
   * @returns {Promise<Address>}
   */
  async newOnchainAddress(): Promise<Address> {
    let hex = await this._ldk.newOnchainAddress(this.id);
    return new Address(hex);
  }

  /**
   * Send an on-chain payment to the given address.
   * @requires [address] address of Node
   * @requires [amountMsat] amount in milli sats
   * @returns {Promise<TxId>}
   */
  async sendToOnchainAddress(address: Address, amountMsat: number): Promise<Txid> {
    let txid = await this._ldk.sendToOnchainAddress(this.id, address.addressHex, amountMsat);
    return new Txid(txid);
  }

  /**
   * Send an on-chain payment to the given address, draining all the available funds.
   * @requires [address] address of Node
   * @returns {Promise<TxId>}
   */
  async sendAllToOnchainAddress(address: Address): Promise<Txid> {
    let txid = await this._ldk.sendAllToOnchainAddress(this.id, address.addressHex);
    return new Txid(txid);
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
   * @requires [address] NetAddress
   * @requires [persist] open node permanently or not
   * @returns {Promise<boolean>}
   */
  async connect(nodeId: string, address: NetAddress, persist: boolean): Promise<boolean> {
    return await this._ldk.connect(this.id, nodeId, addressToString(address), persist);
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
   * @requires [address] NetAddress
   * @requires [channelAmountSats] number
   * @requires [pushToCounterpartyMsat] number
   * @requires [announceChannel] announceChannel or not
   * @returns {Promise<boolean>}
   */
  async connectOpenChannel(
    nodeId: string,
    address: NetAddress,
    channelAmountSats: number,
    pushToCounterpartyMsat: number,
    channelConfig: ChannelConfig | null = null,
    announceChannel: boolean
  ): Promise<boolean> {
    return await this._ldk.connectOpenChannel(
      this.id,
      nodeId,
      addressToString(address),
      channelAmountSats,
      pushToCounterpartyMsat,
      channelConfig,
      announceChannel
    );
  }

  /**
   * Close a previously opened channel.
   * @requires [channelId]
   * @requires [counterpartyNodeId] publicKey of counterparty Node
   * @returns {Promise<boolean>}
   */
  async closeChannel(channelId: ChannelId, counterpartyNodeId: PublicKey): Promise<boolean> {
    return await this._ldk.closeChannel(this.id, channelId.channelIdHex, counterpartyNodeId.keyHex);
  }

  /**
   * Send a payement given an invoice.
   * @requires [invoice]
   * @returns {Promise<PaymentHash>}
   */
  async sendPayment(invoice: string): Promise<PaymentHash> {
    let hash = await this._ldk.sendPayment(this.id, invoice);
    return new PaymentHash(hash);
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
   * @returns {Promise<PaymentHash>}
   */
  async sendPaymentUsingAmount(invoice: string, amountMsat: number): Promise<PaymentHash> {
    let hash = await this._ldk.sendPaymentUsingAmount(this.id, invoice, amountMsat);
    return new PaymentHash(hash);
  }

  /**
   * Send a spontaneous, aka. "keysend", payment
   * @requires [invoice]
   * @requires [amountMsat]
   * @returns {Promise<PaymentHash>}
   */
  async sendSpontaneousPayment(amountMsat: number, nodeId: PublicKey): Promise<PaymentHash> {
    let hash = await this._ldk.sendSpontaneousPayment(this.id, amountMsat, nodeId.keyHex);
    return new PaymentHash(hash);
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
   * Get list of payments
   * @returns {Promise<Array<PaymentDetails>>}
   */
  async listPayments(): Promise<Array<PaymentDetails>> {
    const list = await this._ldk.listPayments(this.id);
    return list.map((item) => createPaymentDetails(item));
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

  /**
   * Retrieve the details of a specific payment with the given hash.
   * Returns `PaymentDetails` if the payment was known and `null` otherwise.
   *
   * @requires [paymentHash]
   * @returns {Promise<PaymentDetails>}
   */
  async payment(paymetHash: PaymentHash): Promise<PaymentDetails> {
    return createPaymentDetails(await this._ldk.payment(this.id, paymetHash.field0));
  }

  /**
   * Remove the payment with the given hash from the store.
   * Returns `true` if the payment was present and `false` otherwise.
   *
   * @requires [paymentHash]
   * @returns {Promise<boolean>}
   */
  async removePayment(paymetHash: PaymentHash): Promise<boolean> {
    return await this._ldk.removePayment(this.id, paymetHash.field0);
  }

  /**
   * Creates a digital ECDSA signature of a message with the node's secret key.
   *
   * A receiver knowing the corresponding `PublicKey` (e.g. the node’s id) and the message can be sure that the signature was generated by the caller.
   *
   * Signatures are EC recoverable, meaning that given the message and the signature the PublicKey of the signer can be extracted.
   * @requires [msg]
   * @returns {Promise<string>}
   */
  async signMessage(msg: Array<number>): Promise<string> {
    return await this._ldk.signMessage(this.id, msg);
  }

  /**
   * Verifies that the given ECDSA signature was created for the given message with the secret key corresponding to the given public key.
   *
   * @requires [msg]
   * @requires [sig] returned string from signMessage()
   * @requires [pkey] public key of node
   * @returns {Promise<string>}
   */
  async verifySignature(msg: Array<number>, sig: string, pkey: PublicKey): Promise<boolean> {
    return await this._ldk.verifySignature(this.id, msg, sig, pkey.keyHex);
  }

  /**
   * Update the config for a previously opened channel.
   *
   * @requires [channelId]
   * @requires [counterpartyNodeId]
   * @requires [channelConfig]
   * @returns {Promise<string>}
   */
  async updateChannelConfig(
    channelId: ChannelId,
    counterpartyNodeId: PublicKey,
    channelConfig: ChannelConfig
  ): Promise<boolean> {
    return await this._ldk.updateChannelConfig(
      this.id,
      channelId.channelIdHex,
      counterpartyNodeId.keyHex,
      channelConfig
    );
  }
}
