export declare function Proxy<T extends object>(originalModule: T, fn: (PO: ProxyOptions) => void): T;
export type ProxyOptions = {
    /**
     * This can be toggled during the proxied function to cease the target function call from executing.
     */
    Cancel: boolean;
};
