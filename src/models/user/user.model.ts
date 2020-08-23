import { DataTypes, Model, Op } from 'sequelize';
import { sequelize } from '../database';
class User extends Model {
    public id!: string;
    public login!: string;
    public password!: string;
    public age!: number;
    public is_deleted!: boolean;
}

User.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.TEXT
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
        sequelize,
        timestamps: false,
        schema: 'public',
        tableName: 'Users'
    }
);

export class UserModel implements IUserModel {
    public async findOne(id: string): Promise<UserDomain | null> {
        const user = User.findOne({
            where: {
                id
            }
        });
        return user;
    }

    public async findAll(): Promise<UserDomain[]> {
        const users = await User.findAll();
        return users;
    }

    public async findAllByLoginSubstring(loginSubstring: string, limit: number): Promise<UserDomain[]> {
        const users = await User.findAll({
            limit,
            where: {
                login: {
                    [Op.like]: `%${loginSubstring}%`
                }
            }
        });
        return users;
    }

    public async create(user: UserDomain): Promise<UserDomain> {
        const newUser = await User.create(user);
        return newUser;
    }

    public async update({ id, login, password, age, is_deleted }: UserDomain): Promise<UserDomain[]> {
        const newUser = await User.update(
            { login, password, age, is_deleted },
            {
                returning: true,
                where: {
                    id
                }
            }
        );

        return newUser[1];
    }
}
