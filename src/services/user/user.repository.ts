export class UserRepository {
    private model: IUserModel;

    constructor(userModel: IUserModel) {
        this.model = userModel;
    }

    public readOne(id: string): User | undefined {
        return this.model.readOne(id);
    }

    public getAll(): User[] {
        return this.model.getAll();
    }

    public getAutoSuggestUsers(loginSubstring: string, limit: number): User[] {
        return this.model.getAutoSuggestUsers(loginSubstring, limit);
    }

    public add(userDTO: UserDTO): User {
        return this.model.add(userDTO);
    }

    public update(id: string, userDTO: UserDTO): User | void {
        return this.model.update(id, userDTO);
    }

    public delete(id: string): User | void {
        return this.model.delete(id);
    }
}
