import { NativeLoader } from './NativeLoader';

export class ChannelConfig extends NativeLoader {
  id: string = '';

  fromId(id: string): this {
    this.id = id;
    return this;
  }

  async create(): Promise<this> {
    this.id = await this._ldk.createChannelConfig();
    return this;
  }

  async acceptUnderpayingHtlcs(): Promise<boolean> {
    return await this._ldk.acceptUnderpayingHtlcs(this.id);
  }

  async cltvExpiryDelta(): Promise<number> {
    return await this._ldk.cltvExpiryDelta(this.id);
  }

  async forceCloseAvoidanceMaxFeeSatoshis(): Promise<number> {
    return await this._ldk.forceCloseAvoidanceMaxFeeSatoshis(this.id);
  }

  async forwardingFeeBaseMsat(): Promise<number> {
    return await this._ldk.forwardingFeeBaseMsat(this.id);
  }

  async forwardingFeeProportionalMillionths(): Promise<number> {
    return await this._ldk.forwardingFeeProportionalMillionths(this.id);
  }

  async setAcceptUnderpayingHtlcs(value: boolean): Promise<boolean> {
    return await this._ldk.setAcceptUnderpayingHtlcs(this.id, value);
  }

  async setCltvExpiryDelta(value: number): Promise<boolean> {
    return await this._ldk.setCltvExpiryDelta(this.id, value);
  }

  async setForceCloseAvoidanceMaxFeeSatoshis(valueSat: number): Promise<boolean> {
    return await this._ldk.setForceCloseAvoidanceMaxFeeSatoshis(this.id, valueSat);
  }

  async setForwardingFeeBaseMsat(feeMsat: number): Promise<boolean> {
    return await this._ldk.setForwardingFeeBaseMsat(this.id, feeMsat);
  }

  async setForwardingFeeProportionalMillionths(value: number): Promise<boolean> {
    return await this._ldk.setForwardingFeeProportionalMillionths(this.id, value);
  }

  async setMaxDustHtlcExposureFromFeeRateMultiplier(multiplier: number): Promise<boolean> {
    return await this._ldk.setMaxDustHtlcExposureFromFeeRateMultiplier(this.id, multiplier);
  }

  async setMaxDustHtlcExposureFromFixedLimit(limitMsat: number): Promise<boolean> {
    return await this._ldk.setMaxDustHtlcExposureFromFixedLimit(this.id, limitMsat);
  }
}
