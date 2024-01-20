import { LogLevel } from './Bindings';
import { NativeLoader } from './NativeLoader';
import { addressToString } from '../utils';
export class Config extends NativeLoader {
    constructor() {
        super(...arguments);
        this.id = '';
    }
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
    async create(storageDirPath, logDirPath = 'tmp/ldk_node', network, listeningAddress, defaultCltvExpiryDelta = 144, onchainWalletSyncIntervalSecs = 80, walletSyncIntervalSecs = 30, feeRateCacheUpdateIntervalSecs = 600, trustedPeers0conf = [], probingLiquidityLimitMultiplier = 3, logLevel = LogLevel.debug) {
        this.id = await this._ldk.createConfig(storageDirPath, logDirPath, network, listeningAddress == null ? null : listeningAddress.map((addr) => addressToString(addr)), defaultCltvExpiryDelta, onchainWalletSyncIntervalSecs, walletSyncIntervalSecs, feeRateCacheUpdateIntervalSecs, trustedPeers0conf, probingLiquidityLimitMultiplier, logLevel);
        return this;
    }
}
//# sourceMappingURL=Config.js.map