import { NativeLoader } from './NativeLoader';
export class Node extends NativeLoader {
    /**
     * Create node id
     */
    constructor(id) {
        super();
        this.id = '';
        this.id = id;
    }
    /**
     * Start node
     * @returns Promise<boolean>
     */
    async start() {
        return this._ldk.start(this.id);
    }
    /**
     * Get nodeId
     * @returns Promise<string>
     */
    async nodeId() {
        return this._ldk.nodeId(this.id);
    }
}
//# sourceMappingURL=Node.js.map