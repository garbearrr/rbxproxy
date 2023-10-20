"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proxy = void 0;
function Proxy(originalModule, fn) {
    const ProxyOptions = {
        Cancel: false
    };
    const wrapped = {};
    for (const key in originalModule) {
        if (typeof originalModule[key] === 'function') {
            wrapped[key] = function (...args) {
                ProxyOptions.Cancel = false;
                // Call the proxy function
                fn(ProxyOptions, key);
                if (ProxyOptions.Cancel)
                    return;
                // Call the original function
                return originalModule[key](...args);
            };
        }
        else {
            // Copy over non-function properties
            wrapped[key] = originalModule[key];
        }
    }
    return wrapped;
}
exports.Proxy = Proxy;
