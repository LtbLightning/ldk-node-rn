import { SocketAddr } from './Bindings';
import { NativeLoader } from './NativeLoader';

export class Config extends NativeLoader {
  id: string = '';

  /**
   *  Create config
   * @param storageDirPath
   * @param esploraServerUrl
   * @param network
   * @param listeningAddress
   * @param defaultCltvExpiryDelta
   * @returns {Promise<Config>}
   */
  async create(
    storageDirPath: string,
    esploraServerUrl: string,
    network: string,
    listeningAddress: SocketAddr | null,
    defaultCltvExpiryDelta: number
  ): Promise<Config> {
    this.id = await this._ldk.createConfig(
      storageDirPath,
      esploraServerUrl,
      network,
      listeningAddress == null ? null : `${listeningAddress.ip}:${listeningAddress.port}`,
      defaultCltvExpiryDelta
    );
    return this;
  }
}
