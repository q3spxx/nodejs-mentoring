import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export interface UserByIdSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string;
    };
}

export interface UserPutByIdSchema extends UserByIdSchema {
    [ContainerTypes.Body]: UserDTO;
}

export interface UserPostByIdSchema extends UserByIdSchema {
    [ContainerTypes.Query]: {
        groupName: string;
    };
}

export interface UserDeleteByIdSchema extends UserByIdSchema {
    [ContainerTypes.Query]: {
        groupName?: string;
        force?: boolean;
    };
}

export interface UserPostSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: UserDTO;
}

export interface UsersGetSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        loginSubstring: string;
        limit?: number;
    };
}
