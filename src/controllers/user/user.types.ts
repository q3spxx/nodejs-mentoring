import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export interface AutoSuggestUsersSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        loginSubstring: string;
        limit: number;
    };
}

export interface UserByIdSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string;
    };
    [ContainerTypes.Body]: Omit<UserDTO, 'id' | 'isDeleted'>;
}

export interface PostUserSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: Omit<UserDTO, 'id' | 'isDeleted'>;
}
