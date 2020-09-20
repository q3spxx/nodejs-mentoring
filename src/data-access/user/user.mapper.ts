export class UserDataMapper implements IUserDataMapper {
    private groupsMapper: IGroupDataMapper;

    constructor(groupsMapper: IGroupDataMapper) {
        this.groupsMapper = groupsMapper;
    }

    public toDomain({ id, login, password, age, isDeleted }: UserDTO): UserDomain {
        return {
            id,
            login,
            password,
            age,
            is_deleted: isDeleted
        };
    }

    public toDalEntity({ id, login, password, age, is_deleted, groups }: UserDomain): UserDTO {
        return {
            id,
            login,
            password,
            age,
            isDeleted: is_deleted,
            groups: groups ? groups.map((group) => this.groupsMapper.toDalEntity(group)) : []
        };
    }
}
