//
//  Counter.m
//  PIR3_BRIDGE
//
//  Created by iskandirov.mr on 10.09.2024.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(Counter, RCTEventEmitter)

RCT_EXTERN_METHOD(increments:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(decrement:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)


@end
