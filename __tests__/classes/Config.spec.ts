import { mockLdkNodeModule } from '../setup';
import { Config } from '../../src';
import { mockConfig, mockUUID } from '../mockData';

describe('Config', () => {
  mockLdkNodeModule.createConfig.mockResolvedValue(mockUUID);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a config instance', async () => {
    let config = await mockConfig();
    expect(config).toBeInstanceOf(Config);
    expect(config.id).toBe(mockUUID);
  });
});
