export abstract class AError extends Error {
    private status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }

    public getResponse(): IErrorResponse {
        return {
            status: 'Failed',
            message: this.message
        };
    }

    public getStatus(): number {
        return this.status;
    }
}
