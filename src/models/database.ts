import { sequelize } from './sequelize';
import { createUsersTable } from './users/users.tables';
import { createUserGroupsTable } from './user-groups/user-groups.table';
import { createGroupsTable } from './groups/groups.table';
import { Users } from './users/users.model';
import { Groups } from './groups/groups.model';
import { UserGroups } from './user-groups/user-groups.model';

(async (): Promise<void> => {
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

    console.log('\x1b[32m%s\x1b[0m', 'Database initialization done');
})();
