import { ChannelDetails, PeerDetails } from './Bindings';
export interface NativeLdkNodeRn {
    createConfig(storageDirPath: string, network: string, listeningAddress: string | null, defaultCltvExpiryDelta: number): string;
    fromConfig(configId: string): string;
    setEsploraServer(buildId: string, esploraServerUrl: string): boolean;
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
    connect(nodeId: string, pubKey: string, address: string, permanently: boolean): boolean;
    disconnect(nodeId: string, pubKey: string): boolean;
    connectOpenChannel(nodeId: string, pubKey: string, address: string, channelAmountSats: number, pushToCounterpartyMsat: number, announceChannel: boolean): boolean;
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
}
export declare class NativeLoader {
    protected _ldk: NativeLdkNodeRn;
    constructor();
}
