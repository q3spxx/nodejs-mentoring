export class GroupDataMapper implements IGroupDataMapper {
    public toDomain(group: GroupDTO): GroupDomain {
        return group;
    }

    public toDalEntity({ id, name, permissions }: GroupDomain): GroupDTO {
        return {
            id,
            name,
            permissions
        };
    }
}
