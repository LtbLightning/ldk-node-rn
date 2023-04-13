import { NativeLoader } from './NativeLoader';
export class Config extends NativeLoader {
    constructor() {
        super(...arguments);
        this.id = '';
    }
    /**
     *  Create config
     * @param storageDirPath
     * @param esploraServerUrl
     * @param network
     * @param listeningAddress
     * @param defaultCltvExpiryDelta
     * @returns {Promise<Config>}
     */
    async create(storageDirPath, esploraServerUrl, network, listeningAddress, defaultCltvExpiryDelta) {
        this.id = await this._ldk.createConfig(storageDirPath, esploraServerUrl, network, listeningAddress, defaultCltvExpiryDelta);
        return this;
    }
}
//# sourceMappingURL=Config.js.map