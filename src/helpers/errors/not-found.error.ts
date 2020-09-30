import { AError } from './error.abstract';

export class NotFoundError extends AError {
    constructor(message?: string) {
        super(404, message || 'Not found');
    }
}
