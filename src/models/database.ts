import { sequelize } from './sequelize';
import { createUsersTable } from './users/users.tables';
import { createUserGroupsTable } from './user-groups/user-groups.table';
import { createGroupsTable } from './groups/groups.table';
import { createAdminUser, Users } from './users/users.model';
import { Groups } from './groups/groups.model';
import { UserGroups } from './user-groups/user-groups.model';
import { logger } from '@helpers/loggers';

sequelize
    .authenticate()
    .then(
        () => {
            logger.info('Database connection done');
        },
        (error) => {
            logger.error('Database connection error', error);
            process.exit(1);
        }
    )
    .then(async () => {
        const queryInterface = sequelize.getQueryInterface();

        await createGroupsTable(queryInterface);
        await createUsersTable(queryInterface);
        await createUserGroupsTable(queryInterface);

        Users.belongsToMany(Groups, {
            through: UserGroups,
            as: 'groups',
            foreignKey: 'user_id',
            targetKey: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        Groups.belongsToMany(Users, {
            through: UserGroups,
            as: 'users',
            foreignKey: 'group_id',
            targetKey: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        await createAdminUser();
        logger.info('Database initialization done');
    })
    .catch(() => {
        logger.error('Database initialization error');
        process.exit(1);
    });
