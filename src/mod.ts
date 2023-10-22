export function Proxy<T extends {}>(target: T, handler: ProxyHandler<T> = {}): T {
    // State of the proxy
    const state: T = { ...target };

    // Metatable to override property accesses and modifications
    const meta: LuaMetatable<T> = {
        __index: (_self: T, key: unknown) => {
            if (handler.get)
                return handler.get(state, key as keyof T, (key: keyof T) => state[key as keyof T]);

            return state[key as keyof T];
        },
        __newindex: (_self: T, key: unknown, value: unknown) => {
            if (handler.set)
                return handler.set(state, key as keyof T, value);

            state[key as keyof T] = value as T[keyof T];
        }
    };

    // Methods to manipulate the state
    const methods = (localState: T) => ({
        set: function(key: keyof T, value: any) {
            localState[key] = value;
        },
        get: function(key: keyof T) {
            return localState[key];
        }
    });

    // Create an empty proxy object and set its metatable
    const proxyObject = setmetatable({} as T, meta) as T;

    return proxyObject;
}

export interface ProxyHandler<T extends {}> {
    get?: (obj: T, key: keyof T, accessor?: (key: keyof T) => T[keyof T]) => any;
    set?: (obj: T, key: keyof T, value: any) => any;
}