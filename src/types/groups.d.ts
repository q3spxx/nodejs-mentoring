declare type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

declare interface GroupDomain {
    id?: string;
    name?: string;
    permissions?: Permission[];
    users?: UserDTO[];
}

declare interface GroupDTO {
    id?: string;
    name?: string;
    permissions?: Permission[];
    users?: UserDomain[];
}

declare interface IGroupDataMapper {
    toDomain(user: GroupDTO): GroupDomain;
    toDalEntity(user: GroupDomain): GroupDTO;
}

declare interface IGroupsModel {
    findOne(id: string): Promise<GroupDomain | null>;
    findAll(): Promise<GroupDomain[]>;
    create(group: GroupDomain): Promise<GroupDomain>;
    update(group: GroupDomain): Promise<GroupDomain[]>;
    delete(id: string): Promise<number>;
}
