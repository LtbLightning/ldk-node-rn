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
    nodeId: (nonnull NSString*)nodeId
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)
@end
