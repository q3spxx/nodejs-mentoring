export class GroupsRepository {
    private model: IGroupsModel;
    private mapper: IGroupDataMapper;

    constructor(groupsModel: IGroupsModel, groupDataMapper: IGroupDataMapper) {
        this.model = groupsModel;
        this.mapper = groupDataMapper;
    }

    public async getGroup(id: string): Promise<GroupDTO | null> {
        const group = await this.model.findOne(id);

        if (group) {
            return this.mapper.toDalEntity(group);
        }

        return group;
    }

    public async getAllGroups(): Promise<GroupDTO[]> {
        const groups = await this.model.findAll();
        return groups.map((group) => this.mapper.toDalEntity(group));
    }

    public async createGroup(groupDTO: GroupDTO): Promise<GroupDTO> {
        const group = await this.model.create(this.mapper.toDomain(groupDTO));
        return this.mapper.toDalEntity(group);
    }

    public async updateGroup(groupDTO: GroupDTO): Promise<GroupDTO[]> {
        const groups = await this.model.update(this.mapper.toDomain(groupDTO));
        return groups.map((group) => this.mapper.toDalEntity(group));
    }

    public async deleteGroup(id: string): Promise<number> {
        const groups = await this.model.delete(id);
        return groups;
    }
}
