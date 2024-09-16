//
//  Counter.swift
//  PIR3_BRIDGE
//
//  Created by iskandirov.mr on 10.09.2024.
//

import Foundation


@objc(Counter)
class Counter : RCTEventEmitter {
  
  private var count = 0;
  
  @objc
  func increments(_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock){
    count += 1;
    //    print(count)
    sendEvent(withName: "onIncrement", body: [count])
  }
  
  @objc
  override static func requiresMainQueueSetup() -> Bool{
    return true;
  }
  
  @objc
  override func constantsToExport() -> [AnyHashable:Any]!{
    return ["initCount":0]
  }
  
  override func supportedEvents() -> [String]! {
    return ["onIncrement","onDecrement"]
  }
  
  @objc
  func decrement (_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
    if (count == 0) {
      let error = NSError(domain: "", code: 200, userInfo: nil);
      reject("ERRoR_COUNT", "число не может быть отрицательынм", error)
    }
    else {
      count -= 1;
      resolve("count = \(count)")
      sendEvent(withName: "onDecrement", body: [count])
      
    }
  }
  
}


