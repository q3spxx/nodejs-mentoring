class GroupsService {
    getAllGroups(): Promise<void> {
        return Promise.resolve();
    }

    getGroup(id: string): Promise<string> {
        return Promise.resolve(id);
    }

    createGroup(data: { name: string }): Promise<{ name: string }> {
        return Promise.resolve(data);
    }

    updateGroup(data: { id: string; name: string }): Promise<{ id: string; name: string }> {
        return Promise.resolve(data);
    }

    deleteGroup(id: string): Promise<string> {
        return Promise.resolve(id);
    }
}

class UsersService {
    getAllUsers(): Promise<void> {
        return Promise.resolve();
    }

    getUser(id: string): Promise<string> {
        return Promise.resolve(id);
    }

    createUser(data: { name: string }): Promise<{ name: string }> {
        return Promise.resolve(data);
    }

    updateUser(data: { id: string; name: string }): Promise<{ id: string; name: string }> {
        return Promise.resolve(data);
    }

    deleteUser(id: string, force: string): Promise<{ id: string; force: string }> {
        return Promise.resolve({ id, force });
    }

    removeGroupFromUser(id: string, groupName: string): Promise<{ id: string; groupName: string }> {
        return Promise.resolve({ id, groupName });
    }

    addGroupToUser(id: string, groupName: string): Promise<{ id: string; groupName: string }> {
        return Promise.resolve({ id, groupName });
    }

    getAutoSuggestUsers(loginSubstring: string, limit: string): Promise<{ loginSubstring: string; limit: number }> {
        return Promise.resolve({ loginSubstring, limit: Number(limit) });
    }

    getUserByLoginAndPassword(username: string, password: string): Promise<{ username: string; password: string }> {
        return Promise.resolve({ username, password });
    }
}

export const groupsService = new GroupsService();
export const usersService = new UsersService();
