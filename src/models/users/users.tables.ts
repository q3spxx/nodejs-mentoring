import { DataTypes, QueryInterface } from 'sequelize';
import { USERS_TABLE_NAME } from './user.constants';

export const createUsersTable = async (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.createTable(USERS_TABLE_NAME, {
        id: {
            primaryKey: true,
            allowNull: false,
            unique: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        login: {
            allowNull: false,
            type: DataTypes.TEXT,
            unique: true
        },
        password: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        age: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        is_deleted: {
            allowNull: false,
            type: DataTypes.BOOLEAN
        }
    });
