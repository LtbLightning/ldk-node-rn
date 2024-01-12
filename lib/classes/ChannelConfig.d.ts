import { NativeLoader } from './NativeLoader';
export declare class ChannelConfig extends NativeLoader {
    id: string;
    fromId(id: string): this;
    create(): Promise<this>;
    acceptUnderpayingHtlcs(): Promise<boolean>;
    cltvExpiryDelta(): Promise<number>;
    forceCloseAvoidanceMaxFeeSatoshis(): Promise<number>;
    forwardingFeeBaseMsat(): Promise<number>;
    forwardingFeeProportionalMillionths(): Promise<number>;
    setAcceptUnderpayingHtlcs(value: boolean): Promise<boolean>;
    setCltvExpiryDelta(value: number): Promise<boolean>;
    setForceCloseAvoidanceMaxFeeSatoshis(valueSat: number): Promise<boolean>;
    setForwardingFeeBaseMsat(feeMsat: number): Promise<boolean>;
    setForwardingFeeProportionalMillionths(value: number): Promise<boolean>;
    setMaxDustHtlcExposureFromFeeRateMultiplier(multiplier: number): Promise<boolean>;
    setMaxDustHtlcExposureFromFixedLimit(limitMsat: number): Promise<boolean>;
}
