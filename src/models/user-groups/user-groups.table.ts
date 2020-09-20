import { DataTypes, QueryInterface } from 'sequelize';
import { GROUPS_TABLE_NAME } from '../groups/groups.constants';
import { USERS_TABLE_NAME } from '../users/user.constants';
import { USER_GROUPS_TABLE_NAME } from './user-groups.constants';

export const createUserGroupsTable = async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.createTable(USER_GROUPS_TABLE_NAME, {
        user_id: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: USERS_TABLE_NAME,
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        group_id: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: GROUPS_TABLE_NAME,
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    });
