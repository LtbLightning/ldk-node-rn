#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LdkNodeRnModule, NSObject)

+ (BOOL)requiresMainQueueSetup { return NO; }

/** Config methods */
RCT_EXTERN_METHOD(
    createConfig: (nonnull NSString*)storageDirPath
    esploraServerUrl: (nonnull NSString*)esploraServerUrl
    network: (nonnull NSString*)network
    listeningAddress: (nonnull NSString*)listeningAddress
    defaultCltvExpiryDelta: (nonnull NSNumber*)defaultCltvExpiryDelta
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
    newFundingAddress: (nonnull NSString*)nodeId
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
    permanently: (nonnull BOOL*)permanently
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
    announceChannel: (nonnull BOOL*)announceChannel
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
    receivePayment: (nonnull NSString*)nodeId
    amountMsat: (nonnull NSNumber*)amountMsat
    description: (nonnull NSString*)description
    expirySecs: (nonnull NSNumber*)expirySecs
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)
@end
