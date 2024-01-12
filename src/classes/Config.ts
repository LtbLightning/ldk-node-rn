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
    logDirPath: string = 'tmp/ldk_node',
    network: string,
    listeningAddress: [NetAddress] | null,
    defaultCltvExpiryDelta: number = 144,
    onchainWalletSyncIntervalSecs: number = 80,
    walletSyncIntervalSecs: number = 30,
    feeRateCacheUpdateIntervalSecs: number = 600,
    trustedPeers0conf: Array<string> = [],
    probingLiquidityLimitMultiplier: number = 3,
    logLevel: LogLevel = LogLevel.debug
  ): Promise<Config> {
    this.id = await this._ldk.createConfig(
      storageDirPath,
      logDirPath,
      network,
      listeningAddress == null ? null : listeningAddress.map((addr) => addressToString(addr)),
      defaultCltvExpiryDelta,
      onchainWalletSyncIntervalSecs,
      walletSyncIntervalSecs,
      feeRateCacheUpdateIntervalSecs,
      trustedPeers0conf,
      probingLiquidityLimitMultiplier,
      logLevel
    );
    return this;
  }
}
