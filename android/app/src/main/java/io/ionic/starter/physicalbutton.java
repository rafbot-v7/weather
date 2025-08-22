package io.ionic.starter;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "physicalbutton")
public class physicalbutton extends Plugin{

    @PluginMethod
        public void NativeMethod(PluginCall call){
        JSObject result = new JSObject();
        result.put("message", "Hello Android user!");
        call.resolve(result);
    }

    @PluginMethod
        public void NotifyListeners(PluginCall call){
        JSObject result = new JSObject();
        result.put("message", "Hello Android user!");
        notifyListeners("EVENT_LISTENER_NAME", result);
    }
    
}
