declare interface UserDTO {
    id?: string;
    login?: string;
    password?: string;
    age?: number;
    groups?: GroupDTO[];
    isDeleted?: boolean;
}

declare interface UserDomain {
    id?: string;
    login?: string;
    password?: string;
    age?: number;
    groups?: GroupDomain[];
    is_deleted?: boolean;
}

declare interface IUserDataMapper {
    toDomain(user: UserDTO): UserDomain;
    toDalEntity(user: UserDomain): UserDTO;
}

declare interface IUsersModel {
    findOne(id: string): Promise<UserDomain | null>;
    findAll(): Promise<UserDomain[]>;
    findAllByLoginSubstring(loginSubstring: string, limit?: number): Promise<UserDomain[]>;
    create(user: UserDomain): Promise<UserDomain>;
    update(user: UserDomain): Promise<UserDomain[]>;
    delete(id: string): Promise<number>;
    addGroupToUser(id: string, groupName: string): Promise<UserDomain | null>;
    removeGroupFromUser(id: string, groupName: string): Promise<UserDomain | null>;
    findByLoginAndPassword(login: string, password: string): Promise<UserDomain | null>;
}
