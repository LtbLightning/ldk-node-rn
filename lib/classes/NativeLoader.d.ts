import { ChannelConfig, ChannelDetails, PeerDetails } from './Bindings';
export interface NativeLdkNodeRn {
    createConfig(storageDirPath: string, logDirPath: string | null, network: string, listeningAddress: string | null, defaultCltvExpiryDelta: number, onchainWalletSyncIntervalSecs: number, walletSyncIntervalSecs: number, feeRateCacheUpdateIntervalSecs: number, logLevel: string, trustedPeers0conf: Array<string>): string;
    fromConfig(configId: string): string;
    setEntropySeedPath(buildId: string, seedPath: string): boolean;
    setEntropySeedBytes(buildId: string, seedBytes: Array<number>): boolean;
    setEntropyBip39Mnemonic(buildId: string, mnemonic: string, passphrase?: string): boolean;
    setEsploraServer(buildId: string, esploraServerUrl: string): boolean;
    setGossipSourceP2p(buildId: string): boolean;
    setGossipSourceRgs(buildId: string, rgsServerUrl: string): boolean;
    setStorageDirPath(buildId: string, storageDirPath: string): boolean;
    setNetwork(buildId: string, network: string): boolean;
    setListeningAddress(buildId: string, listeningAddress: string): boolean;
    build(buildId: string): string;
    start(nodeId: string): boolean;
    stop(nodeId: string): boolean;
    syncWallets(nodeId: string): boolean;
    nodeId(nodeId: string): string;
    newOnchainAddress(nodeId: string): string;
    sendToOnchainAddress(nodeId: string, address: string, amountMsat: number): string;
    sendAllToOnchainAddress(nodeId: string, address: string): string;
    spendableOnchainBalanceSats(nodeId: string): number;
    totalOnchainBalanceSats(nodeId: string): number;
    connect(nodeId: string, pubKey: string, address: string, persist: boolean): boolean;
    disconnect(nodeId: string, pubKey: string): boolean;
    connectOpenChannel(nodeId: string, pubKey: string, address: string, channelAmountSats: number, pushToCounterpartyMsat: number, channelConfig: any, announceChannel: boolean): boolean;
    closeChannel(nodeId: string, channelId: string, counterpartyNodeId: string): boolean;
    receivePayment(nodeId: string, amountMsat: number, description: string, expirySecs: number): string;
    receiveVariableAmountPayment(nodeId: string, description: string, expirySecs: number): string;
    sendPayment(nodeId: string, invoice: string): string;
    sendPaymentUsingAmount(nodeId: string, invoice: string, amountMsat: number): string;
    sendSpontaneousPayment(nodeId: string, amountMsat: number, pubKey: string): string;
    listPeers(nodeId: string): Array<PeerDetails>;
    listChannels(nodeId: string): Array<ChannelDetails>;
    payment(nodeId: string, paymentHash: string): any;
    removePayment(nodeId: string, paymentHash: string): boolean;
    signMessage(nodeId: string, msg: Array<number>): string;
    verifySignature(nodeId: string, msg: Array<number>, sig: string, pkey: string): boolean;
    updateChannelConfig(nodeId: string, channelId: string, counterpartyNodeId: string, channelConfig: ChannelConfig): boolean;
    createEntropyMnemonic(): string;
}
export declare class NativeLoader {
    _ldk: NativeLdkNodeRn;
    constructor();
}
