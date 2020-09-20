import { UsersRepository } from '@repositories';
import { UsersModel } from '@models';
import { GroupDataMapper, UserDataMapper } from '@data-access';
import { NotFoundError } from '@helpers/errors';

class UsersService {
    private repository: UsersRepository;

    constructor() {
        this.repository = new UsersRepository(new UsersModel(), new UserDataMapper(new GroupDataMapper()));
    }

    public async getUser(id: string): Promise<UserDTO> {
        const user = await this.repository.getUser(id);

        if (user) {
            return user;
        }

        throw new NotFoundError('User not found');
    }

    public async getAllUsers(): Promise<UserDTO[]> {
        return this.repository.getAllUsers();
    }

    public async getAutoSuggestUsers(loginSubstring: string, limit?: number): Promise<UserDTO[]> {
        return this.repository.getAutoSuggestUsers(loginSubstring, limit);
    }

    public async createUser(userDTO: UserDTO): Promise<UserDTO> {
        return this.repository.createUser({
            ...userDTO,
            isDeleted: false
        });
    }

    public async addGroupToUser(id: string, groupName: string): Promise<UserDTO | null> {
        return this.repository.addGroupToUser(id, groupName);
    }

    public async removeGroupFromUser(id: string, groupName: string): Promise<UserDTO | null> {
        return this.repository.removeGroupFromUser(id, groupName);
    }

    public async updateUser(userDTO: UserDTO): Promise<UserDTO[]> {
        return this.repository.updateUser(userDTO);
    }

    public async deleteUser(id: string, force?: boolean): Promise<UserDTO[] | number> {
        return force ? this.repository.deleteUser(id) : this.repository.updateUser({ id, isDeleted: true });
    }
}

export const usersService = new UsersService();
