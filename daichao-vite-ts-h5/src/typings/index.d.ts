declare class ApiRes<T> {
    data: T;
    message: string;
    code: string;
    constructor(res: { oryfact: T, ateperfor: string, urelect: string });
    get isSuccess(): boolean;
    static parse<T>(res: { oryfact: T, ateperfor: string, urelect: string }): ApiRes<T>;
}
