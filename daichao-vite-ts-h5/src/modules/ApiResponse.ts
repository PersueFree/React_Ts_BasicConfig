export interface resType<T> {
    "oryfact": T;
    "ateperfor": string;
    "urelect": string;
}

export class ApiResponse<T> {
    data: T;
    message: string;
    code: string;
    constructor(res: resType<T>) {
        this.data = res["oryfact"];
        this.message = res["ateperfor"];
        this.code = res["urelect"];
    }
    get isSuccess(): boolean {
        return ["0", "00", "10086"].includes(this.code);
    }
    static parse<T>(res: resType<T>): ApiResponse<T> {
        return new ApiResponse(res);
    }
}