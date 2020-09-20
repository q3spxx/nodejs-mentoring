import { DataTypes, Model, Op, Transaction } from 'sequelize';
import { sequelize } from '../sequelize';
import { DatabaseError, databaseErrorHandler } from '@helpers/errors';
import { Groups } from '../groups/groups.model';
import { USERS_TABLE_NAME } from './user.constants';
import { UserGroups } from '../user-groups/user-groups.model';

export const Users = sequelize.define<Model & UserDomain>(
    USERS_TABLE_NAME,
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        login: {
            type: DataTypes.TEXT
        },
        password: {
            type: DataTypes.TEXT
        },
        age: {
            type: DataTypes.INTEGER
        },
        is_deleted: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        timestamps: false,
        schema: 'public'
    }
);

const userGroupsAssociation = {
    model: Groups,
    as: 'groups'
};

export class UsersModel implements IUsersModel {
    public async findOne(id: string): Promise<UserDomain | null> {
        const user = Users.findOne({
            where: {
                id
            },
            include: [userGroupsAssociation]
        }).catch(databaseErrorHandler);
        return user;
    }

    public async findAll(): Promise<UserDomain[]> {
        const users = await Users.findAll({ include: [userGroupsAssociation] }).catch(databaseErrorHandler);
        return users;
    }

    public async findAllByLoginSubstring(loginSubstring: string, limit?: number): Promise<UserDomain[]> {
        const users = await Users.findAll({
            limit,
            where: {
                login: {
                    [Op.like]: `%${loginSubstring}%`
                }
            },
            include: [userGroupsAssociation]
        }).catch(databaseErrorHandler);
        return users;
    }

    public async create(userDomain: UserDomain): Promise<UserDomain> {
        const user = await Users.create(userDomain, { include: [userGroupsAssociation] }).catch(databaseErrorHandler);
        return user;
    }

    public async addGroupToUser(id: string, groupName: string): Promise<UserDomain | null> {
        return sequelize
            .transaction(
                async (transaction: Transaction): Promise<UserDomain | null> => {
                    const group = await Groups.findOne({
                        where: {
                            name: groupName
                        },
                        transaction
                    });

                    if (!group) {
                        throw new DatabaseError('Such a group is not exists');
                    }

                    const user = await Users.findOne({
                        where: {
                            id
                        },
                        transaction
                    });

                    if (!user) {
                        throw new DatabaseError('Such a user is not exists');
                    }

                    await UserGroups.findOrCreate({
                        where: {
                            user_id: id,
                            group_id: group.id
                        },
                        transaction
                    });

                    const userWithGroup = await Users.findOne({
                        where: {
                            id
                        },
                        include: [userGroupsAssociation],
                        transaction
                    });

                    return userWithGroup;
                }
            )
            .catch(databaseErrorHandler);
    }

    public async removeGroupFromUser(id: string, groupName: string): Promise<UserDomain | null> {
        return sequelize.transaction(
            async (transaction: Transaction): Promise<UserDomain | null> => {
                const group = await Groups.findOne({
                    where: {
                        name: groupName
                    },
                    transaction
                });

                if (!group) {
                    throw new DatabaseError('Such a group is not exists');
                }

                const user = await Users.findOne({
                    where: {
                        id
                    },
                    transaction
                });

                if (!user) {
                    throw new DatabaseError('Such a user is not exists');
                }

                await UserGroups.destroy({
                    where: {
                        user_id: id,
                        group_id: group.id
                    },
                    transaction
                });

                const userWithoutGroup = await Users.findOne({
                    where: {
                        id
                    },
                    include: [userGroupsAssociation],
                    transaction
                });

                return userWithoutGroup;
            }
        );
    }

    public async update({ id, ...userDomain }: UserDomain): Promise<UserDomain[]> {
        const users = await Users.update(userDomain, {
            returning: true,
            where: {
                id
            }
        }).catch(databaseErrorHandler);

        return users[1];
    }

    public async delete(id: string): Promise<number> {
        const users = await Users.destroy({
            where: {
                id
            }
        }).catch(databaseErrorHandler);

        return users;
    }
}
