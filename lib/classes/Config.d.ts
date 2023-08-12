import { LogLevel, NetAddress } from './Bindings';
import { NativeLoader } from './NativeLoader';
export declare class Config extends NativeLoader {
    id: string;
    /**
     *  Create config
     * @requires storageDirPath
     * @requires network
     * @param listeningAddress
     * @param defaultCltvExpiryDelta
     * @param onchainWalletSyncIntervalSecs
     * @param walletSyncIntervalSecs
     * @param feeRateCacheUpdateIntervalSecs
     * @param logLevel
     * @param trustedPeers0conf
     * @returns {Promise<Config>}
     */
    create(storageDirPath: string, network: string, listeningAddress: NetAddress | null, defaultCltvExpiryDelta?: number, onchainWalletSyncIntervalSecs?: number, walletSyncIntervalSecs?: number, feeRateCacheUpdateIntervalSecs?: number, logLevel?: LogLevel, trustedPeers0conf?: Array<string>): Promise<Config>;
}
