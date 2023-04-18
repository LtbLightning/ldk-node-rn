export interface NativeLdkNodeRn {
    createConfig(storageDirPath: string, esploraServerUrl: string, network: string, listeningAddress: string, defaultCltvExpiryDelta: number): string;
    fromConfig(configId: string): string;
    build(buildId: string): string;
    start(nodeId: string): boolean;
    stop(nodeId: string): boolean;
    syncWallets(nodeId: string): boolean;
    nodeId(nodeId: string): string;
    newFundingAddress(nodeId: string): string;
    spendableOnchainBalanceSats(nodeId: string): number;
    totalOnchainBalanceSats(nodeId: string): number;
    connect(nodeId: string, pubKey: string, address: string, permanently: boolean): boolean;
    disconnect(nodeId: string, pubKey: string): boolean;
    connectOpenChannel(nodeId: string, pubKey: string, address: string, channelAmountSats: number, pushToCounterpartyMsat: number, announceChannel: boolean): boolean;
    receivePayment(nodeId: string, amountMsat: number, description: string, expirySecs: number): string;
}
export declare class NativeLoader {
    protected _ldk: NativeLdkNodeRn;
    constructor();
}
