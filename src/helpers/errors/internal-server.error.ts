import { AError } from './error.abstract';

export class InternalServerError extends AError {
    constructor(message?: string) {
        super(500, message || 'Internal Server Error');
    }
}
