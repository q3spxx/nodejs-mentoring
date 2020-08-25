import { v4 as uuid } from 'uuid';

const users: User[] = [
    {
        id: '1',
        login: '111',
        password: '111',
        age: 23,
        isDeleted: false
    },
    {
        id: uuid(),
        login: 'SPetr',
        password: 'lolKek1987',
        age: 33,
        isDeleted: false
    },
    {
        id: uuid(),
        login: 'Petr',
        password: 'lolKek1987',
        age: 33,
        isDeleted: false
    },
    {
        id: uuid(),
        login: 'PetrS',
        password: 'lolKek1987',
        age: 33,
        isDeleted: false
    }
];
export class UserModel implements IUserModel {
    public readOne(userId: string): User | undefined {
        return users.find(({ id }) => id === userId);
    }

    public getAll(): User[] {
        return users;
    }

    public getAutoSuggestUsers(loginSubstring: string, limit: number): User[] {
        const sortedUsers = users.sort((userA, userB) => userA.login.localeCompare(userB.login));
        const userList: User[] = [];

        for (let i = 0; sortedUsers.length > i && userList.length < limit; i++) {
            const user = sortedUsers[i];

            if (user.login.toLocaleLowerCase().includes(loginSubstring.toLocaleLowerCase())) {
                userList.push(user);
            }
        }

        return userList;
    }

    public add({ login, password, age }: UserDTO): User {
        const user: User = {
            id: uuid(),
            login,
            password,
            age,
            isDeleted: false
        };

        users.push(user);

        return user;
    }

    public update(userId: string, { login, password, age }: UserDTO): User | void {
        const userIndex = users.findIndex(({ id }) => id === userId);

        if (userIndex !== -1) {
            const user = users[userIndex];
            const updatedUser = { ...user, login, password, age };

            users[userIndex] = updatedUser;

            return updatedUser;
        }
    }

    public delete(userId: string): User | void {
        const userIndex = users.findIndex(({ id }) => id === userId);

        if (userIndex !== -1) {
            const user = users[userIndex];
            const deletedUser = { ...user, isDeleted: true };

            users[userIndex] = deletedUser;

            return deletedUser;
        }
    }
}
