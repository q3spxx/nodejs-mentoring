import { GroupsRepository } from '@repositories';
import { GroupsModel } from '@models';
import { GroupDataMapper } from '@data-access';
import { NotFoundError } from '@helpers/errors';

class GroupsService {
    private repository: GroupsRepository;

    constructor() {
        this.repository = new GroupsRepository(new GroupsModel(), new GroupDataMapper());
    }

    public async getGroup(id: string): Promise<GroupDTO> {
        const group = await this.repository.getGroup(id);

        if (group) {
            return group;
        }

        throw new NotFoundError('Group not found');
    }

    public async getAllGroups(): Promise<GroupDTO[]> {
        return this.repository.getAllGroups();
    }

    public async createGroup(groupDTO: GroupDTO): Promise<GroupDTO> {
        return this.repository.createGroup(groupDTO);
    }

    public async updateGroup(groupDTO: GroupDTO): Promise<GroupDTO[]> {
        return this.repository.updateGroup(groupDTO);
    }

    public async deleteGroup(id: string): Promise<number> {
        return this.repository.deleteGroup(id);
    }
}

export const groupsService = new GroupsService();
