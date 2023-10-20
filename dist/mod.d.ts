/// <reference types="@rbxts/compiler-types" />
export declare function Proxy<T extends Record<string, AnyFunction>>(originalModule: T, fn: (PO: ProxyOptions) => void): T;
type AnyFunction = (...args: any[]) => any;
type ProxyOptions = {
    /**
     * This can be toggled during the proxied function to cease the target function call from executing.
     */
    Cancel: boolean;
};
export {};
