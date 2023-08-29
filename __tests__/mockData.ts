import { Config, Node } from '../src';
import { LogLevel, NetAddress } from '../src/classes/Bindings';

const host = '127.0.0.1';
export const esploraServerUrl = `http://${host}:50000`;
export const gossipRgsUrl = `http://${host}:9735`;
export const seedPhrase = 'mom mom mom mom mom mom mom mom mom mom mom mom';
export const nodeStoragePath = 'alice_node';
export const listeningAddress = new NetAddress(host, 5000);
export const networkName = 'regtest';
export const mockUUID = 'A4CCF9FD-FCA0-4171-94FD-4726F025FAC9';

export const mockConfig = async () =>
  await new Config().create(nodeStoragePath, networkName, listeningAddress, 144, 80, 30, 600, LogLevel.debug, []);
