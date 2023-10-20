export function Proxy<T extends object>(originalModule: T, fn: (PO: ProxyOptions) => void): T {
    const ProxyOptions: ProxyOptions = {
        Cancel: false
    };

    const wrapped: any = {};

    // Iterate using pairs() for object keys and values in Roblox-TS
    for (const [key, value] of pairs(originalModule)) {
        const strKey = key as string;
        if (typeOf(value) === 'function') {
            wrapped[strKey] = function(...args: unknown[]): any {
                ProxyOptions.Cancel = false;
                
                // Call the proxy function
                fn(ProxyOptions);
    
                if (ProxyOptions.Cancel) return;
    
                // Call the original function
                return (value as AnyFunction)(...args);
            };
        } else {
            // Copy over non-function properties
            wrapped[strKey] = value;
        }
    }

    return wrapped as T;
}


type AnyFunction = (...args: any[]) => any;

export type ProxyOptions = {
    /**
     * This can be toggled during the proxied function to cease the target function call from executing.
     */
    Cancel: boolean;
}