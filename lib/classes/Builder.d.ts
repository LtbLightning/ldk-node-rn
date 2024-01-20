import { Config } from './Config';
import { NativeLoader } from './NativeLoader';
import { NetAddress } from './Bindings';
import { Node } from './Node';
export declare class Builder extends NativeLoader {
    id: string;
    /**
     * Create builder class from [Config]
     * @requires config
     * @returns Promise<Builder>
     */
    fromConfig(config: Config): Promise<Builder>;
    /**
     * Configures the [Node] instance to source its wallet entropy from a seed file on disk.
     *
     * If the given file does not exist a new random seed file will be generated and stored at the given location.
     * @requires seedPath
     * @returns {Promise<boolean>}
     */
    setEntropySeedPath(seedPath: string): Promise<boolean>;
    /**
     * Configures the [Node] instance to source its wallet entropy from the given 64 seed bytes.
     *
     * **Note:** Panics if the length of the given `seedBytes` differs from 64.
     * @requires seedBytes
     * @returns {Promise<boolean>}
     */
    setEntropySeedBytes(seedBytes: Array<number>): Promise<boolean>;
    /**
     * Set mnemoninc
     *
     * @requires mnemoninc
     * @param passphrase
     * @returns {Promise<boolean>}
     */
    setEntropyBip39Mnemonic(mnemoninc: string, passphrase?: string): Promise<boolean>;
    /**
     * Configures the [Node] instance to source its chain data from the given Esplora server.
     * @requires esploraServerUrl
     * @returns {Promise<boolean>}
     */
    setEsploraServer(esploraServerUrl: string): Promise<boolean>;
    /**
     * Configures the [Node] instance to source its gossip data from the Lightning peer-to-peer network.
     * @returns {Promise<boolean>}
     */
    setGossipSourceP2p(): Promise<boolean>;
    /**
     * Configures the [Node] instance to source its gossip data from the given RapidGossipSync server.
     * @requires rgsServerUrl
     * @returns {Promise<boolean>}
     */
    setGossipSourceRgs(rgsServerUrl: string): Promise<boolean>;
    /**
     * Sets the used storage directory path.
     * @requires storageDirPath
     * @returns {Promise<boolean>}
     */
    setStorageDirPath(storageDirPath: string): Promise<boolean>;
    /**
     * Sets the Bitcoin network used.
     * @requires network
     * @returns {Promise<boolean>}
     */
    setNetwork(network: string): Promise<boolean>;
    /**
     * Sets the IP addresses and TCP port on which [Node] will listen for incoming network connections.
     * @requires listeningAddresses
     * @returns {Promise<boolean>}
     */
    setListeningAddresses(listeningAddresses: Array<NetAddress>): Promise<boolean>;
    /**
     * Create node
     * @returns {Promise<Node>}
     */
    build(): Promise<Node>;
}
