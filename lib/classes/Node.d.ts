import { NativeLoader } from './NativeLoader';
export declare class Node extends NativeLoader {
    id: string;
    /**
     * Create node id
     */
    constructor(id: string);
    /**
     * Start node
     * @returns Promise<boolean>
     */
    start(): Promise<boolean>;
    /**
     * Get nodeId
     * @returns Promise<string>
     */
    nodeId(): Promise<string>;
}
