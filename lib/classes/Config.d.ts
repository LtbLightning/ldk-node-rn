import { NetAddress } from './Bindings';
import { NativeLoader } from './NativeLoader';
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
    create(storageDirPath: string, network: string, listeningAddress: NetAddress | null, defaultCltvExpiryDelta: number): Promise<Config>;
}
