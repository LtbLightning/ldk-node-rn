import { NativeLoader } from './NativeLoader';
import { SocketAddr } from './Bindings';

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
    listeningAddress: SocketAddr | null,
    defaultCltvExpiryDelta: number
  ): Promise<Config> {
    this.id = await this._ldk.createConfig(
      storageDirPath,
      network,
      listeningAddress == null ? null : `${listeningAddress.ip}:${listeningAddress.port}`,
      defaultCltvExpiryDelta
    );
    return this;
  }
}
