export declare function Proxy<T extends {}>(target: T, handler?: ProxyHandler<T>): T;
export interface ProxyHandler<T extends {}> {
    get?: (obj: T, key: keyof T, accessor: (key: keyof T) => T[keyof T]) => any;
    set?: (obj: T, key: keyof T, value: any) => any;
}
