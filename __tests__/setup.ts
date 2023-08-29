export const mockLdkNodeModule = {
  createConfig: jest.fn(),
  fromConfig: jest.fn(),

  setEsploraServer: jest.fn(),
  setEntropySeedPath: jest.fn(),
  setEntropySeedBytes: jest.fn(),
  setEntropyBip39Mnemonic: jest.fn(),
  setGossipSourceP2p: jest.fn(),
  setGossipSourceRgs: jest.fn(),
  setStorageDirPath: jest.fn(),
  setNetwork: jest.fn(),
  setListeningAddress: jest.fn(),
  build: jest.fn(),

  nodeId: jest.fn(),
};

jest.mock('react-native', () => ({
  NativeModules: { LdkNodeRnModule: mockLdkNodeModule },
}));
