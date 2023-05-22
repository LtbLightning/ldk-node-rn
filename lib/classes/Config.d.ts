import { SocketAddr } from './Bindings';
import { NativeLoader } from './NativeLoader';
export declare class Config extends NativeLoader {
    id: string;
    /**
     *  Create config
     * @param storageDirPath
     * @param esploraServerUrl
     * @param network
     * @param listeningAddress
     * @param defaultCltvExpiryDelta
     * @returns {Promise<Config>}
     */
    create(storageDirPath: string, esploraServerUrl: string, network: string, listeningAddress: SocketAddr | null, defaultCltvExpiryDelta: number): Promise<Config>;
}
