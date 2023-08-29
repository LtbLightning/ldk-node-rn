import { mockLdkNodeModule } from '../setup';
import { Builder, Config, Node } from '../../src';
import {
  esploraServerUrl,
  gossipRgsUrl,
  listeningAddress,
  mockConfig,
  mockUUID,
  networkName,
  nodeStoragePath,
  seedPhrase,
} from '../mockData';

describe('Builder', () => {
  mockLdkNodeModule.fromConfig.mockResolvedValue(mockUUID);
  let config: Config;
  let builder: Builder;

  beforeAll(async () => {
    config = await mockConfig();
    builder = await new Builder().fromConfig(config);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a builder instance', async () => {
    expect(builder).toBeInstanceOf(Builder);
    expect(builder.id).toBe(mockUUID);
  });

  it('should set esplora sever URL', async () => {
    mockLdkNodeModule.setEsploraServer.mockResolvedValue(true);
    let res = await builder.setEsploraServer(esploraServerUrl);
    expect(res).toBe(true);
  });

  it('should set entropy seed path', async () => {
    mockLdkNodeModule.setEntropySeedPath.mockResolvedValue(true);
    let res = await builder.setEntropySeedPath(nodeStoragePath);
    expect(res).toBe(true);
  });

  it('should set entropy seed bytes', async () => {
    mockLdkNodeModule.setEntropySeedBytes.mockResolvedValue(true);
    let res = await builder.setEntropySeedBytes([12, 15, 12]);
    expect(res).toBe(true);
  });

  it('should set mnemonic', async () => {
    mockLdkNodeModule.setEntropyBip39Mnemonic.mockResolvedValue(true);
    let res = await builder.setEntropyBip39Mnemonic(seedPhrase);
    expect(res).toBe(true);
  });

  it('should set gossip source p2p', async () => {
    mockLdkNodeModule.setGossipSourceP2p.mockResolvedValue(true);
    let res = await builder.setGossipSourceP2p();
    expect(res).toBe(true);
  });

  it('should set gossip source Rgs', async () => {
    mockLdkNodeModule.setGossipSourceRgs.mockResolvedValue(true);
    let res = await builder.setGossipSourceRgs(gossipRgsUrl);
    expect(res).toBe(true);
  });

  it('should set storage path', async () => {
    mockLdkNodeModule.setStorageDirPath.mockResolvedValue(true);
    let res = await builder.setStorageDirPath(nodeStoragePath);
    expect(res).toBe(true);
  });

  it('should set network', async () => {
    mockLdkNodeModule.setNetwork.mockResolvedValue(true);
    let res = await builder.setNetwork(networkName);
    expect(res).toBe(true);
  });

  it('should set listening address', async () => {
    mockLdkNodeModule.setListeningAddress.mockResolvedValue(true);
    let res = await builder.setListeningAddress(listeningAddress);
    expect(res).toBe(true);
  });

  it('should build node from builder', async () => {
    mockLdkNodeModule.build.mockResolvedValue(mockUUID);
    let ldkNode = await builder.build();
    expect(ldkNode.id).toBe(mockUUID);
    expect(ldkNode).toBeInstanceOf(Node);
  });
});
