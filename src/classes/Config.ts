import { addressToString } from '../utils';
import { NetAddress } from './Bindings';
import { NativeLoader } from './NativeLoader';

export class Config extends NativeLoader {
  id: string = '';

  /**
   *  Create config
   * @param storageDirPath
   * @param network
   * @param listeningAddress
   * @param defaultCltvExpiryDelta
   * @returns {Promise<Config>}
   */
  async create(
    storageDirPath: string,
    network: string,
    listeningAddress: NetAddress | null,
    defaultCltvExpiryDelta: number
  ): Promise<Config> {
    this.id = await this._ldk.createConfig(
      storageDirPath,
      network,
      listeningAddress == null ? null : addressToString(listeningAddress),
      defaultCltvExpiryDelta
    );
    return this;
  }
}
