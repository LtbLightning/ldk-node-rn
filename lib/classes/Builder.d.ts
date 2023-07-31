import { Config } from './Config';
import { NativeLoader } from './NativeLoader';
import { Node } from './Node';
export declare class Builder extends NativeLoader {
    id: string;
    /**
     * Create builder class from [Config]
     * @param config
     * @returns Promise<Builder>
     */
    fromConfig(config: Config): Promise<Builder>;
    /**
     * Set Esplora server URL
     * @param setEsploraServer
     * @returns Promise<boolean>
     */
    setEsploraServer(esploraServerUrl: string): Promise<boolean>;
    /**
     * Create node
     * @returns Promise<Node>
     */
    build(): Promise<Node>;
}
