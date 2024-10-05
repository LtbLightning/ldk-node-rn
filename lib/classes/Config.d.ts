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
    create(storageDirPath: string, logDirPath: string | undefined, network: string, listeningAddress: Array<NetAddress> | null, defaultCltvExpiryDelta?: number, onchainWalletSyncIntervalSecs?: number, walletSyncIntervalSecs?: number, feeRateCacheUpdateIntervalSecs?: number, trustedPeers0conf?: Array<string>, probingLiquidityLimitMultiplier?: number, logLevel?: LogLevel): Promise<Config>;
}
