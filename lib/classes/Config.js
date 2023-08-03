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
     * @requries logDirPath
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
    async create(storageDirPath, logDirPath, network, listeningAddress, defaultCltvExpiryDelta = 144, onchainWalletSyncIntervalSecs = 80, walletSyncIntervalSecs = 30, feeRateCacheUpdateIntervalSecs = 600, logLevel = LogLevel.debug, trustedPeers0conf = []) {
        this.id = await this._ldk.createConfig(storageDirPath, logDirPath, network, listeningAddress == null ? null : addressToString(listeningAddress), defaultCltvExpiryDelta, onchainWalletSyncIntervalSecs, walletSyncIntervalSecs, feeRateCacheUpdateIntervalSecs, logLevel, trustedPeers0conf);
        return this;
    }
}
//# sourceMappingURL=Config.js.map