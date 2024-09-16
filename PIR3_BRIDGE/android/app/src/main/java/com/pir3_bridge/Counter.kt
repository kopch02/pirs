package com.pir3_bridge

import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.bridge.ReactContext.RCTDeviceEventEmitter
import com.facebook.react.modules.core.DeviceEventManagerModule

class CounterModule internal constructor(context: ReactApplicationContext?) :
    ReactContextBaseJavaModule(context){
        private var eventCount = 0
    override fun getName(): String {
        return "CounterModule"
    }

    @ReactMethod
    fun createCounterEvent(callback: Callback) {
        Log.d("CounterModule", "asdasd")
        callback.invoke("из нативного модуля каунтер")
    }

    @ReactMethod
    fun createCounterPromise(promise: Promise) {
        try {
            promise.resolve("data returned promise")
            eventCount += 1
            sendEvent(reactApplicationContext, "EventCount", eventCount)

        } catch (e: Exception) {
            promise.reject("error", e)
        }
    }

    private fun sendEvent(
        reactContext: ReactContext,
        eventName:String,
        params: Int
    ) {
        reactContext.getJSModule(RCTDeviceEventEmitter::class.java).emit(eventName, params)
    }

    }