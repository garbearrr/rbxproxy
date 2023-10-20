export function Proxy<T extends Record<string, AnyFunction>>(originalModule: T): T {
    let isDestroyed = false;

    const wrapped: Record<string, AnyFunction> = {};

    for (const key in originalModule) {
        if (typeof originalModule[key] === 'function') {
            wrapped[key] = function(...args: any[]): any {
                if (isDestroyed) 
                    return print('Module was destroyed! Cannot call ' + key);
                // Call the original function
                return originalModule[key](...args);
            };
        }
    }

    wrapped['destroy'] = function() {
        isDestroyed = true;
    };

    return wrapped as T;
}

type AnyFunction = (...args: any[]) => any;