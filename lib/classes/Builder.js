import { NativeLoader } from './NativeLoader';
import { Node } from './Node';
export class Builder extends NativeLoader {
    constructor() {
        super(...arguments);
        this.id = '';
    }
    /**
     * Create builder class from [Config]
     * @param config
     * @returns Promise<Builder>
     */
    async fromConfig(config) {
        this.id = await this._ldk.fromConfig(config.id);
        return this;
    }
    /**
     * Set Esplora server URL
     * @param setEsploraServer
     * @returns Promise<boolean>
     */
    async setEsploraServer(esploraServerUrl) {
        return await this._ldk.setEsploraServer(this.id, esploraServerUrl);
    }
    /**
     * Create node
     * @returns Promise<Node>
     */
    async build() {
        let id = await this._ldk.build(this.id);
        return new Node(id);
    }
}
//# sourceMappingURL=Builder.js.map