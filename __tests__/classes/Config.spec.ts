import { mockLdkNodeModule } from '../setup';
import { Config, generateEntropyMnemonic } from '../../src';
import { mockConfig, mockUUID, seedPhrase } from '../mockData';

describe('Config and utils', () => {
  mockLdkNodeModule.createConfig.mockResolvedValue(mockUUID);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a config instance', async () => {
    let config = await mockConfig();
    expect(config).toBeInstanceOf(Config);
    expect(config.id).toBe(mockUUID);
  });

  it('should create entropy mnemonic', async () => {
    mockLdkNodeModule.createEntropyMnemonic.mockResolvedValue(seedPhrase);
    expect(await generateEntropyMnemonic()).toBe(seedPhrase);
  });
});
