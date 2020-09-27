import { AError } from './error.abstract';

export class BadRequestError extends AError {
    constructor(message?: string) {
        super(400, message || 'Bad request');
    }
}
