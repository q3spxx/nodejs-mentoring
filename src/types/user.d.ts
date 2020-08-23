declare interface UserDTO {
    id?: string;
    login?: string;
    password?: string;
    age?: number;
    isDeleted?: boolean;
}

declare interface UserDomain {
    id?: string;
    login?: string;
    password?: string;
    age?: number;
    is_deleted?: boolean;
}
declare interface IUserDataMapper {
    toDomain(user: UserDTO): UserDomain;
    toDalEntity(user: UserDomain): UserDTO;
}

declare interface IUserModel {
    findOne(id: string): Promise<UserDomain | null>;
    findAll(): Promise<UserDomain[]>;
    findAllByLoginSubstring(loginSubstring: string, limit: number): Promise<UserDomain[]>;
    create(user: UserDomain): Promise<UserDomain>;
    update(user: UserDomain): Promise<UserDomain[]>;
}
