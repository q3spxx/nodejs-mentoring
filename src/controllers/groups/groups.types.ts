import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export interface GroupByIdSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string;
    };
}

export interface GroupPutByIdSchema extends GroupByIdSchema {
    [ContainerTypes.Body]: GroupDTO;
}

export interface GroupPostSchema extends GroupByIdSchema {
    [ContainerTypes.Body]: GroupDTO;
}
