#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LdkNodeRnModule, NSObject)

+ (BOOL)requiresMainQueueSetup { return NO; }


RCT_EXTERN_METHOD(
    testFn: (nonnull NSString*)wordCount
    resolve: (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject
)
@end
