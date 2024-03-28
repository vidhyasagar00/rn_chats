package com.chats

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class NetworkModule(
    private val context: ReactApplicationContext
) : ReactContextBaseJavaModule() {
    override fun getName(): String = "network_status"

    @ReactMethod
    fun getNetworkStatus(name : String, promise: Promise) {

    }

//    private fun isNetworkAvailable(): Boolean {
//        val conxMgr = ContextCompat.getSystemService(context, ConnectivityManager::class.java)
//        val mobileNwInfo = conxMgr?.activeNetwork
//        val wifiNwInfo = conxMgr?.getNetworkInfo(ConnectivityManager.TYPE_WIFI)
//        return mobileNwInfo?.isAvailable ?: false || wifiNwInfo?.isAvailable ?: false
//    }
}