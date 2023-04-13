import { Node } from './Node';
import { Config } from './Config';
import { NativeLoader } from './NativeLoader';
export declare class Builder extends NativeLoader {
    id: string;
    /**
     * Create builder class from [Config]
     * @param config
     * @returns Promise<Builder>
     */
    fromConfig(config: Config): Promise<Builder>;
    /**
     * Create node
     * @returns Promise<Node>
     */
    build(): Promise<Node>;
}
