export function Proxy<T>(originalModule: T, fn: (PO: ProxyOptions, funcName: string) => void): T {
    const ProxyOptions: ProxyOptions = {
        Cancel: false
    };

    const wrapped: any = {};

    for (const key in originalModule) {
        if (typeof originalModule[key] === 'function') {
            wrapped[key] = function(...args: any[]): any {
                ProxyOptions.Cancel = false;
                
                // Call the proxy function
                fn(ProxyOptions, key);

                if (ProxyOptions.Cancel) return;

                // Call the original function
                return (originalModule[key] as AnyFunction)(...args);
            };
        } else {
            // Copy over non-function properties
            wrapped[key] = originalModule[key];
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