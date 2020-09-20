declare interface IErrorResponse {
    status: string;
    message: string;
}

declare interface IError {
    getStatus(): number;
    getResponse(): IErrorResponse;
}
