import { v4 as uuid } from 'uuid';
export class UserRepository {
    private model: IUserModel;
    private mapper: IUserDataMapper;

    constructor(userModel: IUserModel, userDataMapper: IUserDataMapper) {
        this.model = userModel;
        this.mapper = userDataMapper;
    }

    public async getUser(id: string): Promise<UserDTO> {
        const user = await this.model.findOne(id);

        if (user) {
            return this.mapper.toDalEntity(user);
        }

        throw new Error('User not found');
    }

    public async getAllUsers(): Promise<UserDTO[]> {
        const users = await this.model.findAll();
        return users.map((user) => this.mapper.toDalEntity(user));
    }

    public async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<UserDTO[]> {
        const users = await this.model.findAllByLoginSubstring(loginSubstring, limit);
        return users.map((user) => this.mapper.toDalEntity(user));
    }

    public async createUser(userDTO: UserDTO): Promise<UserDTO> {
        const user = await this.model.create(
            this.mapper.toDomain({
                ...userDTO,
                id: uuid(),
                isDeleted: false
            })
        );

        return this.mapper.toDalEntity(user);
    }

    public async updateUser(userDTO: UserDTO): Promise<UserDTO[]> {
        const users = await this.model.update(this.mapper.toDomain(userDTO));
        return users.map((user) => this.mapper.toDalEntity(user));
    }

    public async deleteUser(id: string): Promise<UserDTO[]> {
        const users = await this.model.update(this.mapper.toDomain({ id, isDeleted: true }));
        return users.map((user) => this.mapper.toDalEntity(user));
    }
}
