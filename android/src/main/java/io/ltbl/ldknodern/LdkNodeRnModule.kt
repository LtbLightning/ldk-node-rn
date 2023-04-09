package io.ltbl.ldknodern
import com.facebook.react.bridge.*

class LdkNodeRnModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "LdkNodeRnModule"
    override fun getConstants(): MutableMap<String, Any> {
        return hashMapOf("count" to 1)
    }

    @ReactMethod
    fun testFn(wordCount: String, result: Promise) {
        result.resolve("Returning from Native Kotlin: " + wordCount)
    }
}

