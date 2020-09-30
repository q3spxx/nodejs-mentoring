import { AError } from './error.abstract';

export class DatabaseError extends AError {
    constructor(message?: string) {
        super(500, message || 'Database error');
    }
}
