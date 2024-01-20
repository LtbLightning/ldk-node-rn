#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LdkNodeRnModule, NSObject)

+ (BOOL)requiresMainQueueSetup { return NO; }

/** Config methods */
RCT_EXTERN_METHOD(
    createConfig: (nonnull NSString*)storageDirPath
    logDirPath: (nullable NSString*)logDirPath
    network: (nonnull NSString*)network
    listeningAddresses: (nonnull NSArray*)listeningAddresses
    defaultCltvExpiryDelta: (nonnull NSNumber*)defaultCltvExpiryDelta
    onchainWalletSyncIntervalSecs: (nonnull NSNumber*)onchainWalletSyncIntervalSecs
    walletSyncIntervalSecs: (nonnull NSNumber*)walletSyncIntervalSecs
    feeRateCacheUpdateIntervalSecs: (nonnull NSNumber*)feeRateCacheUpdateIntervalSecs
    trustedPeers0conf: (nonnull NSArray*)trustedPeers0conf
    probingLiquidityLimitMultiplier: (nonnull NSNumber*)probingLiquidityLimitMultiplier
    logLevel: (nonnull NSString*)logLevel
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

/** Builder methods */
RCT_EXTERN_METHOD(
    fromConfig: (nonnull NSString*)configId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    setEntropySeedPath: (nonnull NSString*)buildId
    seedPath: (nonnull NSString*)seedPath
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    setEntropySeedBytes: (nonnull NSString*)buildId
    seedBytes: (nonnull NSArray*)seedBytes
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    setEntropyBip39Mnemonic: (nonnull NSString*)buildId
    mnemonic: (nonnull NSString*)mnemonic
    passphrase: (nullable NSString*)passphrase
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    setEsploraServer: (nonnull NSString*)buildId
    esploraServerUrl: (nonnull NSString*)esploraServerUrl
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)


RCT_EXTERN_METHOD(
    setGossipSourceP2p: (nonnull NSString*)buildId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    setGossipSourceRgs: (nonnull NSString*)buildId
    rgsServerUrl: (nonnull NSString*)rgsServerUrl
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    setStorageDirPath: (nonnull NSString*)buildId
    storageDirPath: (nonnull NSString*)storageDirPath
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    setNetwork: (nonnull NSString*)buildId
    network: (nonnull NSString*)network
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    setListeningAddresses: (nonnull NSString*)buildId
    listeningAddresses: (nonnull NSArray*)listeningAddresses
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)


RCT_EXTERN_METHOD(
    build: (nonnull NSString*)buildId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

/** Node methods */
RCT_EXTERN_METHOD(
    start: (nonnull NSString*)nodeId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    listeningAddresses: (nonnull NSString*)nodeId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    stop: (nonnull NSString*)nodeId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    syncWallets: (nonnull NSString*)nodeId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    nodeId: (nonnull NSString*)nodeId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    newOnchainAddress: (nonnull NSString*)nodeId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    sendToOnchainAddress: (nonnull NSString*)nodeId
    address: (nonnull NSString*)address
    amountMsat: (nonnull NSNumber*)amountMsat
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    sendAllToOnchainAddress: (nonnull NSString*)nodeId
    address: (nonnull NSString*)address
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    spendableOnchainBalanceSats: (nonnull NSString*)nodeId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    totalOnchainBalanceSats: (nonnull NSString*)nodeId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    connect: (nonnull NSString*)nodeId
    pubKey: (nonnull NSString*)pubKey
    address: (nonnull NSString*)address
    persist: (nonnull BOOL*)persist
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    disconnect: (nonnull NSString*)nodeId
    pubKey: (nonnull NSString*)pubKey
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    connectOpenChannel: (nonnull NSString*)nodeId
    pubKey: (nonnull NSString*)pubKey
    address: (nonnull NSString*)address
    channelAmountSats: (nonnull NSNumber*)channelAmountSats
    pushToCounterpartyMsat: (nonnull NSNumber*)pushToCounterpartyMsat
    channelConfigId: (nullable NSDictionary*)channelConfigId
    announceChannel: (nonnull BOOL*)announceChannel
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    closeChannel: (nonnull NSString*)nodeId
    channelId: (nonnull NSString*)channelId
    counterpartyNodeId: (nonnull NSString*)counterpartyNodeId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    sendPayment: (nonnull NSString*)nodeId
    invoice: (nonnull NSString*)invoice
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    sendPaymentUsingAmount: (nonnull NSString*)nodeId
    invoice: (nonnull NSString*)invoice
    amountMsat: (nonnull NSNumber*)amountMsat
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    sendSpontaneousPayment: (nonnull NSString*)nodeId
    amountMsat: (nonnull NSNumber*)amountMsat
    pubKey: (nonnull NSString*)pubKey
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)


RCT_EXTERN_METHOD(
    receivePayment: (nonnull NSString*)nodeId
    amountMsat: (nonnull NSNumber*)amountMsat
    description: (nonnull NSString*)description
    expirySecs: (nonnull NSNumber*)expirySecs
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    receiveVariableAmountPayment: (nonnull NSString*)nodeId
    description: (nonnull NSString*)description
    expirySecs: (nonnull NSNumber*)expirySecs
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    listPayments: (nonnull NSString*)nodeId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)


RCT_EXTERN_METHOD(
    listPeers: (nonnull NSString*)nodeId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)


RCT_EXTERN_METHOD(
    listChannels: (nonnull NSString*)nodeId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    payment: (nonnull NSString*)nodeId
    paymentHash: (nonnull NSString*)paymentHash
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    removePayment: (nonnull NSString*)nodeId
    paymentHash: (nonnull NSString*)paymentHash
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    signMessage: (nonnull NSString*)nodeId
    msg: (nonnull NSArray*)msg
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    verifySignature: (nonnull NSString*)nodeId
    msg: (nonnull NSArray*)msg
    sig: (nonnull NSString*)sig
    pkey: (nonnull NSString*)pkey
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    updateChannelConfig: (nonnull NSString*)nodeId
    channelId: (nonnull NSString*)channelId
    counterpartyNodeId: (nonnull NSString*)counterpartyNodeId
    channelConfig: (nonnull NSDictionary*)channelConfig
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    isRunning: (nonnull NSString*)nodeId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    sendPaymentProbes: (nonnull NSString*)nodeId
    invoice: (nonnull NSString*)invoice
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    sendPaymentProbesUsingAmount: (nonnull NSString*)nodeId
    invoice: (nonnull NSString*)invoice
    amountMsat: (nonnull NSNumber*)amountMsat
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    sendSpontaneousPaymentProbes: (nonnull NSString*)nodeId
    amountMsat: (nonnull NSNumber*)amountMsat
    pubKey: (nonnull NSString*)pubKey
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

/** Utilities */
RCT_EXTERN_METHOD(
    createEntropyMnemonic: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)


/** ChannelConfig */
RCT_EXTERN_METHOD(
    createChannelConfig: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    acceptUnderpayingHtlcs: (nonnull NSString*)channelConfigId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    cltvExpiryDelta: (nonnull NSString*)channelConfigId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    forceCloseAvoidanceMaxFeeSatoshis: (nonnull NSString*)channelConfigId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    forwardingFeeBaseMsat: (nonnull NSString*)channelConfigId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    forwardingFeeProportionalMillionths: (nonnull NSString*)channelConfigId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)


RCT_EXTERN_METHOD(
    setAcceptUnderpayingHtlcs: (nonnull NSString*)channelConfigId
    value: (nonnull BOOL*)value
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    setCltvExpiryDelta: (nonnull NSString*)channelConfigId
    value: (nonnull NSNumber*)value
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    setForceCloseAvoidanceMaxFeeSatoshis: (nonnull NSString*)channelConfigId
    valueSat: (nonnull NSNumber*)valueSat
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    setForwardingFeeBaseMsat: (nonnull NSString*)channelConfigId
    feeMsat: (nonnull NSNumber*)feeMsat
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    setForwardingFeeProportionalMillionths: (nonnull NSString*)channelConfigId
    value: (nonnull NSNumber*)value
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    setMaxDustHtlcExposureFromFeeRateMultiplier: (nonnull NSString*)channelConfigId
    multiplier: (nonnull NSNumber*)multiplier
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
    setMaxDustHtlcExposureFromFixedLimit: (nonnull NSString*)channelConfigId
    limitMsat: (nonnull NSNumber*)limitMsat
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)
@end
