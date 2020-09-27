import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export interface LoginPostSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        username: string;
        password: string;
    };
}
