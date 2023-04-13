export interface NativeLdkNodeRn {
    createConfig(storageDirPath: string, esploraServerUrl: string, network: string, listeningAddress: string, defaultCltvExpiryDelta: number): string;
    fromConfig(configId: string): string;
    build(buildId: string): string;
    start(nodeId: string): boolean;
    nodeId(nodeId: string): string;
}
export declare class NativeLoader {
    protected _ldk: NativeLdkNodeRn;
    constructor();
}
