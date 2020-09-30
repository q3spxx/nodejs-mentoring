import { GroupsRepository } from '@repositories';
import { GroupsModel } from '@models';
import { GroupDataMapper } from '@data-access';
import { NotFoundError } from '@helpers/errors';
import { logger } from '@helpers/loggers';

class GroupsService {
    private repository: GroupsRepository;

    constructor() {
        this.repository = new GroupsRepository(new GroupsModel(), new GroupDataMapper());
    }

    public async getGroup(id: string): Promise<GroupDTO> {
        const group = await this.repository.getGroup(id);

        if (group) {
            logger.info(`Group ${id} has been found`);
            return group;
        }

        logger.info(`Group ${id} has been not found`);
        throw new NotFoundError('Group not found');
    }

    public async getAllGroups(): Promise<GroupDTO[]> {
        return this.repository.getAllGroups().then((data) => {
            logger.info('All groups have been returned');
            return data;
        });
    }

    public async createGroup(groupDTO: GroupDTO): Promise<GroupDTO> {
        return this.repository.createGroup(groupDTO).then((data) => {
            logger.info(`Group ${data.id} has been created`);
            return data;
        });
    }

    public async updateGroup(groupDTO: GroupDTO): Promise<GroupDTO[]> {
        return this.repository.updateGroup(groupDTO).then((data) => {
            logger.info(`Group ${groupDTO.id} has been updated`);
            return data;
        });
    }

    public async deleteGroup(id: string): Promise<number> {
        return this.repository.deleteGroup(id).then((data) => {
            logger.info(`Group ${id} has been deleted`);
            return data;
        });
    }
}

export const groupsService = new GroupsService();
