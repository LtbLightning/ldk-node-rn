import { NativeLoader } from "./NativeLoader";
export class ChannelConfig extends NativeLoader {
    constructor(id) {
        super();
        this.id = "";
        this.id = id;
    }
    async create() {
        this.id = await this._ldk.createChannelConfig();
        return this;
    }
    async acceptUnderpayingHtlcs() {
        return await this._ldk.acceptUnderpayingHtlcs(this.id);
    }
    async cltvExpiryDelta() {
        return await this._ldk.cltvExpiryDelta(this.id);
    }
    async forceCloseAvoidanceMaxFeeSatoshis() {
        return await this._ldk.forceCloseAvoidanceMaxFeeSatoshis(this.id);
    }
    async forwardingFeeBaseMsat() {
        return await this._ldk.forwardingFeeBaseMsat(this.id);
    }
    async forwardingFeeProportionalMillionths() {
        return await this._ldk.forwardingFeeProportionalMillionths(this.id);
    }
    async setAcceptUnderpayingHtlcs(value) {
        return await this._ldk.setAcceptUnderpayingHtlcs(this.id, value);
    }
    async setCltvExpiryDelta(value) {
        return await this._ldk.setCltvExpiryDelta(this.id, value);
    }
    async setForceCloseAvoidanceMaxFeeSatoshis(valueSat) {
        return await this._ldk.setForceCloseAvoidanceMaxFeeSatoshis(this.id, valueSat);
    }
    async setForwardingFeeBaseMsat(feeMsat) {
        return await this._ldk.setForwardingFeeBaseMsat(this.id, feeMsat);
    }
    async setForwardingFeeProportionalMillionths(value) {
        return await this._ldk.setForwardingFeeProportionalMillionths(this.id, value);
    }
    async setMaxDustHtlcExposureFromFeeRateMultiplier(multiplier) {
        return await this._ldk.setMaxDustHtlcExposureFromFeeRateMultiplier(this.id, multiplier);
    }
    async setMaxDustHtlcExposureFromFixedLimit(limitMsat) {
        return await this._ldk.setMaxDustHtlcExposureFromFixedLimit(this.id, limitMsat);
    }
}
//# sourceMappingURL=ChannelConfig.js.map