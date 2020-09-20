import { DataTypes, QueryInterface } from 'sequelize';
import { GROUPS_TABLE_NAME } from './groups.constants';

export const createGroupsTable = async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.createTable(GROUPS_TABLE_NAME, {
        id: {
            primaryKey: true,
            allowNull: false,
            unique: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.TEXT
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.TEXT)
        }
    });
