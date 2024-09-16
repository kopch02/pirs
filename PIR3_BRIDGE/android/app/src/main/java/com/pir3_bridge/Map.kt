package com.pir3_bridge

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import android.Manifest
import android.content.pm.PackageManager
import android.location.Location
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactMethod
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap


class Map(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private val LOCATION_PERMISSION_REQUEST_CODE = 100

    init {
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(reactContext)
    }

    override fun getName(): String {
        return "Map"
    }

    @ReactMethod
    fun getCoords(promise: Promise) {

        val context = reactApplicationContext
        val activity = currentActivity ?: return promise.reject("NO_ACTIVITY", "Activity not found")

        if (ContextCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                activity,
                arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                LOCATION_PERMISSION_REQUEST_CODE
            )
            promise.reject("PERMISSION_DENIED", "Location permission not granted yet")
            return
        }

        if (ActivityCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            promise.reject("PERMISSION_DENIED", "Location permission not granted")
            return
        }

        fusedLocationClient.lastLocation.addOnSuccessListener { location: Location? ->
            if (location != null) {
                val result: WritableMap = WritableNativeMap()
                result.putDouble("lat", location.latitude)
                result.putDouble("lon", location.longitude)
                promise.resolve(result)
            } else {
                promise.reject("NO_LOCATION", "Could not retrieve location")
            }
        }.addOnFailureListener { e ->
            promise.reject("LOCATION_ERROR", e)
        }
    }
}