import { NativeLoader } from './NativeLoader';
export class Config extends NativeLoader {
    constructor() {
        super(...arguments);
        this.id = '';
    }
    /**
     *  Create config
     * @param storageDirPath
     * @param network
     * @param listeningAddress
     * @param defaultCltvExpiryDelta
     * @returns {Promise<Config>}
     */
    async create(storageDirPath, network, listeningAddress, defaultCltvExpiryDelta) {
        this.id = await this._ldk.createConfig(storageDirPath, network, listeningAddress == null ? null : `${listeningAddress.ip}:${listeningAddress.port}`, defaultCltvExpiryDelta);
        return this;
    }
}
//# sourceMappingURL=Config.js.map