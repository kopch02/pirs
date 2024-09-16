//
//  ModalBridge.m
//  PIR3_BRIDGE
//
//  Created by iskandirov.mr on 16.09.2024.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"
#import <React/RCTLog.h>

@interface RCT_EXTERN_MODULE(ModalWindow, NSObject)

RCT_EXTERN_METHOD(showModal:(NSString *)name text:(NSString *)text callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(hideModal)

@end
