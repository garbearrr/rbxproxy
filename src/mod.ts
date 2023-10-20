export function Proxy<T extends Record<string, AnyFunction>>(originalModule: T, fn: (PO: ProxyOptions) => void): T {
    const ProxyOptions: ProxyOptions = {
        Cancel: false
    };

    const wrapped: Record<string, AnyFunction> = {};

    for (const key in originalModule) {
        if (typeof originalModule[key] === 'function') {
            wrapped[key] = function(...args: any[]): any {
                ProxyOptions.Cancel = false;
                
                // Call the proxy function
                fn(ProxyOptions);

                if (ProxyOptions.Cancel) return;

                // Call the original function
                return originalModule[key](...args);
            };
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