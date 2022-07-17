declare class JsonDB<T = any> {
    constructor(path: string, options?: {
        uuid?: boolean,
        primaryKey?: string,
        minify?: boolean,
        timestamp?: boolean,
        stringify?: (o:T) => string,
        parse?: (s:string) => (T | undefined),
    });

    add(key: string, value: T): boolean;
    findById(key: string, id: number): T | undefined;
    findAll(key: string): T[];
    update(key: string, id: number, value: T): boolean;
    delete(key: string, id: number): boolean;
    deleteAll(key: string): boolean;
    clear(): boolean;
}