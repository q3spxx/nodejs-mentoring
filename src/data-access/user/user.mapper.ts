export class UserDataMapper implements IUserDataMapper {
    public toDomain({ id, login, password, age, isDeleted }: UserDTO): UserDomain {
        return {
            id,
            login,
            password,
            age,
            is_deleted: isDeleted
        };
    }

    public toDalEntity({ id, login, password, age, is_deleted }: UserDomain): UserDTO {
        return {
            id,
            login,
            password,
            age,
            isDeleted: is_deleted
        };
    }
}
