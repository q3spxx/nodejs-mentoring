export class UsersRepository {
    private model: IUsersModel;
    private mapper: IUserDataMapper;

    constructor(usersModel: IUsersModel, userDataMapper: IUserDataMapper) {
        this.model = usersModel;
        this.mapper = userDataMapper;
    }

    public async getUser(id: string): Promise<UserDTO | null> {
        const user = await this.model.findOne(id);

        if (user) {
            return this.mapper.toDalEntity(user);
        }

        return user;
    }

    public async getAllUsers(): Promise<UserDTO[]> {
        const users = await this.model.findAll();
        return users.map((user) => this.mapper.toDalEntity(user));
    }

    public async getAutoSuggestUsers(loginSubstring: string, limit?: number): Promise<UserDTO[]> {
        const users = await this.model.findAllByLoginSubstring(loginSubstring, limit);
        return users.map((user) => this.mapper.toDalEntity(user));
    }

    public async createUser(userDTO: UserDTO): Promise<UserDTO> {
        const user = await this.model.create(this.mapper.toDomain(userDTO));
        return this.mapper.toDalEntity(user);
    }

    public async addGroupToUser(id: string, groupName: string): Promise<UserDTO | null> {
        const user = await this.model.addGroupToUser(id, groupName);
        return user ? this.mapper.toDalEntity(user) : user;
    }

    public async removeGroupFromUser(id: string, groupName: string): Promise<UserDTO | null> {
        const user = await this.model.removeGroupFromUser(id, groupName);
        return user ? this.mapper.toDalEntity(user) : user;
    }

    public async updateUser(userDTO: UserDTO): Promise<UserDTO[]> {
        const users = await this.model.update(this.mapper.toDomain(userDTO));
        return users.map((user) => this.mapper.toDalEntity(user));
    }

    public async deleteUser(id: string): Promise<number> {
        const users = await this.model.delete(id);
        return users;
    }
}
