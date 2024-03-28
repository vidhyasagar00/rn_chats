package com.chats

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class NetworkPackage: ReactPackage {
    override fun createNativeModules(
        context: ReactApplicationContext
    ): MutableList<NativeModule> = mutableListOf(NetworkModule(context))

    override fun createViewManagers(
        p0: ReactApplicationContext
    ): MutableList<ViewManager<View, ReactShadowNode<*>>> = mutableListOf()
}