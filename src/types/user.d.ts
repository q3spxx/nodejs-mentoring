declare interface User {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

declare interface UserDTO {
    login: string;
    password: string;
    age: number;
}

declare interface IUserModel {
    readOne(id: string): User | undefined;
    getAll(): User[];
    getAutoSuggestUsers(loginSubstring: string, limit: number): User[];
    add(userDTO: UserDTO): User;
    update(id: string, userDTO: UserDTO): User | void;
    delete(id: string): User | void;
}
