import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';
import { databaseErrorHandler } from '@helpers/errors';
import { GROUPS_TABLE_NAME } from './groups.constants';

export const Groups = sequelize.define<Model & GroupDomain>(
    GROUPS_TABLE_NAME,
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.TEXT
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.TEXT)
        }
    },
    {
        timestamps: false,
        schema: 'public'
    }
);

export class GroupsModel implements IGroupsModel {
    public async findOne(id: string): Promise<GroupDomain | null> {
        const group = Groups.findOne({
            where: {
                id
            }
        }).catch(databaseErrorHandler);

        return group;
    }

    public async findAll(): Promise<GroupDomain[]> {
        const group = await Groups.findAll().catch(databaseErrorHandler);
        return group;
    }

    public async create(groupDomain: GroupDomain): Promise<GroupDomain> {
        const group = await Groups.create(groupDomain).catch(databaseErrorHandler);
        return group;
    }

    public async update({ id, ...groupDomain }: GroupDomain): Promise<GroupDomain[]> {
        const groups = await Groups.update(groupDomain, {
            returning: true,
            where: {
                id
            }
        }).catch(databaseErrorHandler);

        return groups[1];
    }

    public async delete(id: string): Promise<number> {
        const groups = await Groups.destroy({
            where: {
                id
            }
        }).catch(databaseErrorHandler);

        return groups;
    }
}
