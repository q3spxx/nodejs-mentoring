import { DataTypes } from 'sequelize';
import { Users } from '../users/users.model';
import { sequelize } from '../sequelize';
import { Groups } from '../groups/groups.model';
import { USER_GROUPS_TABLE_NAME } from './user-groups.constants';

export const UserGroups = sequelize.define(
    USER_GROUPS_TABLE_NAME,
    {
        user_id: {
            type: DataTypes.UUIDV4,
            references: {
                model: Users,
                key: 'id'
            }
        },
        group_id: {
            type: DataTypes.UUIDV4,
            references: {
                model: Groups,
                key: 'id'
            }
        }
    },
    { timestamps: false, schema: 'public' }
);
