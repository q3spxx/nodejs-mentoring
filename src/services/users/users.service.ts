import { UsersRepository } from '@repositories';
import { UsersModel } from '@models';
import { GroupDataMapper, UserDataMapper } from '@data-access';
import { BadRequestError, NotFoundError } from '@helpers/errors';
import { logger } from '@helpers/loggers';

class UsersService {
    private repository: UsersRepository;

    constructor() {
        this.repository = new UsersRepository(new UsersModel(), new UserDataMapper(new GroupDataMapper()));
    }

    public async getUser(id: string): Promise<UserDTO> {
        const user = await this.repository.getUser(id);

        if (user) {
            logger.info(`User ${id} has been found`);
            return user;
        }

        logger.info(`User ${id} has been not found`);
        throw new NotFoundError('User not found');
    }

    public async getUserByLoginAndPassword(login: string, password: string): Promise<UserDTO> {
        const user = await this.repository.getUserByLoginAndPassword(login, password);

        if (user) {
            logger.info(`User ${login} has been found`);
            return user;
        }

        logger.info(`User ${login} has been not found`);
        throw new BadRequestError('username or password is wrong');
    }

    public async getAllUsers(): Promise<UserDTO[]> {
        return this.repository.getAllUsers().then((data) => {
            logger.info('All users have been returned');
            return data;
        });
    }

    public async getAutoSuggestUsers(loginSubstring: string, limit?: number): Promise<UserDTO[]> {
        return this.repository.getAutoSuggestUsers(loginSubstring, limit).then((data) => {
            logger.info(`All with ${loginSubstring}${limit ? ` and limit ${limit}` : ''} have been returned`);
            return data;
        });
    }

    public async createUser(userDTO: UserDTO): Promise<UserDTO> {
        return this.repository
            .createUser({
                ...userDTO,
                isDeleted: false
            })
            .then((data) => {
                logger.info(`User ${data.id} has been created`);
                return data;
            });
    }

    public async addGroupToUser(id: string, groupName: string): Promise<UserDTO | null> {
        return this.repository.addGroupToUser(id, groupName).then((data) => {
            logger.info(`Group ${groupName} has been added to user ${id}`);
            return data;
        });
    }

    public async removeGroupFromUser(id: string, groupName: string): Promise<UserDTO | null> {
        return this.repository.removeGroupFromUser(id, groupName).then((data) => {
            logger.info(`Group ${groupName} has been removed from user ${id}`);
            return data;
        });
    }

    public async updateUser(userDTO: UserDTO): Promise<UserDTO[]> {
        return this.repository.updateUser(userDTO).then((data) => {
            logger.info(`User ${userDTO.id} has been updated`);
            return data;
        });
    }

    public async deleteUser(id: string, force?: boolean): Promise<UserDTO[] | number> {
        return force
            ? this.repository.deleteUser(id).then((data) => {
                  logger.info(`User ${id} has been fully deleted`);
                  return data;
              })
            : this.repository.updateUser({ id, isDeleted: true }).then((data) => {
                  logger.info(`User ${id} has been deleted`);
                  return data;
              });
    }
}

export const usersService = new UsersService();
