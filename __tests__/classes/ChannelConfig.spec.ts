import { mockLdkNodeModule } from '../setup';
import { ChannelConfig } from '../../src';
import { mockUUID } from '../mockData';

let mockValue = 100;

describe('ChannelConfig', () => {
  mockLdkNodeModule.createChannelConfig.mockResolvedValue(mockUUID);
  let config: ChannelConfig;

  beforeAll(async () => {
    config = await new ChannelConfig().create();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should check if instanceOf ChannelConfig', async () => {
    expect(config).toBeInstanceOf(ChannelConfig);
  });

  it('should check status of acceptUnderpayingHtlcs', async () => {
    mockLdkNodeModule.acceptUnderpayingHtlcs.mockResolvedValue(true);
    let res = await config.acceptUnderpayingHtlcs();
    expect(res).toBe(true);
  });

  it('should get cltvExpiryDelta', async () => {
    mockLdkNodeModule.cltvExpiryDelta.mockResolvedValue(mockValue);
    let res = await config.cltvExpiryDelta();
    expect(res).toBe(mockValue);
  });

  it('should get forceCloseAvoidanceMaxFeeSatoshis', async () => {
    mockLdkNodeModule.forceCloseAvoidanceMaxFeeSatoshis.mockResolvedValue(mockValue);
    let res = await config.forceCloseAvoidanceMaxFeeSatoshis();
    expect(res).toBe(mockValue);
  });

  it('should get forwardingFeeBaseMsat', async () => {
    mockLdkNodeModule.forwardingFeeBaseMsat.mockResolvedValue(mockValue);
    let res = await config.forwardingFeeBaseMsat();
    expect(res).toBe(mockValue);
  });

  it('should get forwardingFeeProportionalMillionths', async () => {
    mockLdkNodeModule.forwardingFeeProportionalMillionths.mockResolvedValue(mockValue);
    let res = await config.forwardingFeeProportionalMillionths();
    expect(res).toBe(mockValue);
  });

  it('should setAcceptUnderpayingHtlcs', async () => {
    mockLdkNodeModule.setAcceptUnderpayingHtlcs.mockResolvedValue(true);
    let res = await config.setAcceptUnderpayingHtlcs(true);
    expect(res).toBe(true);
  });

  it('should setCltvExpiryDelta', async () => {
    mockLdkNodeModule.setCltvExpiryDelta.mockResolvedValue(true);
    let res = await config.setCltvExpiryDelta(mockValue);
    expect(res).toBe(true);
  });

  it('should setForceCloseAvoidanceMaxFeeSatoshis', async () => {
    mockLdkNodeModule.setForceCloseAvoidanceMaxFeeSatoshis.mockResolvedValue(true);
    let res = await config.setForceCloseAvoidanceMaxFeeSatoshis(mockValue);
    expect(res).toBe(true);
  });

  it('should setForwardingFeeBaseMsat', async () => {
    mockLdkNodeModule.setForwardingFeeBaseMsat.mockResolvedValue(true);
    let res = await config.setForwardingFeeBaseMsat(mockValue);
    expect(res).toBe(true);
  });

  it('should setForwardingFeeProportionalMillionths', async () => {
    mockLdkNodeModule.setForwardingFeeProportionalMillionths.mockResolvedValue(true);
    let res = await config.setForwardingFeeProportionalMillionths(mockValue);
    expect(res).toBe(true);
  });

  it('should setMaxDustHtlcExposureFromFeeRateMultiplier', async () => {
    mockLdkNodeModule.setMaxDustHtlcExposureFromFeeRateMultiplier.mockResolvedValue(true);
    let res = await config.setMaxDustHtlcExposureFromFeeRateMultiplier(mockValue);
    expect(res).toBe(true);
  });

  it('should setMaxDustHtlcExposureFromFixedLimit', async () => {
    mockLdkNodeModule.setMaxDustHtlcExposureFromFixedLimit.mockResolvedValue(true);
    let res = await config.setMaxDustHtlcExposureFromFixedLimit(mockValue);
    expect(res).toBe(true);
  });
});
