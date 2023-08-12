import { LogLevel, NetAddress } from './Bindings';

import { NativeLoader } from './NativeLoader';
import { addressToString } from '../utils';

export class Config extends NativeLoader {
  id: string = '';

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
  async create(
    storageDirPath: string,
    network: string,
    listeningAddress: NetAddress | null,
    defaultCltvExpiryDelta: number = 144,
    onchainWalletSyncIntervalSecs: number = 80,
    walletSyncIntervalSecs: number = 30,
    feeRateCacheUpdateIntervalSecs: number = 600,
    logLevel: LogLevel = LogLevel.debug,
    trustedPeers0conf: Array<string> = []
  ): Promise<Config> {
    this.id = await this._ldk.createConfig(
      storageDirPath,
      network,
      listeningAddress == null ? null : addressToString(listeningAddress),
      defaultCltvExpiryDelta,
      onchainWalletSyncIntervalSecs,
      walletSyncIntervalSecs,
      feeRateCacheUpdateIntervalSecs,
      logLevel,
      trustedPeers0conf
    );
    return this;
  }
}
