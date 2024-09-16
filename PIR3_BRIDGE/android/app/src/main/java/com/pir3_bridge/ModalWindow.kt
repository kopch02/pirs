package com.pir3_bridge

import android.app.AlertDialog
import android.content.Context
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback

class ModalWindow (reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ModalWindow"
    }

    @ReactMethod
    fun showModal(title: String?, message: String?,callback: Callback) {
        val activity = currentActivity ?: throw IllegalStateException("No activity found")

        val builder = AlertDialog.Builder(activity)

        builder.setMessage(message)

        builder.setPositiveButton("ОК") { dialog, which ->
            callback("ok")
        }
        builder.setNegativeButton("Отмена") { dialog, which ->
            callback("cansel")
        }

        builder.show()
    }
}