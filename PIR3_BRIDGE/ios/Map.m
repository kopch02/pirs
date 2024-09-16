//
//  Map.m
//  PIR3_BRIDGE
//
//  Created by iskandirov.mr on 12.09.2024.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(Map, RCTEventEmitter)

RCT_EXTERN_METHOD(getCoordinate:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getCoords:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

@end
