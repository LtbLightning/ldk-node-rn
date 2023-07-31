import { NativeLoader } from './NativeLoader';
import { SocketAddr } from './Bindings';
export declare class Config extends NativeLoader {
    id: string;
    /**
     *  Create config
     * @param storageDirPath
     * @param network
     * @param listeningAddress
     * @param defaultCltvExpiryDelta
     * @returns {Promise<Config>}
     */
    create(storageDirPath: string, network: string, listeningAddress: SocketAddr | null, defaultCltvExpiryDelta: number): Promise<Config>;
}
