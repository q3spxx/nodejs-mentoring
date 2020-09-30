import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    username: process.env.DB_USERNAME || 'vcqredejflqpfm',
    password: process.env.DB_PASSWORD || 'ead48f19e28a065920793990d37a6b1b25ab5c8a96a6d2ee0e60238fa0a34abc',
    host: process.env.DB_HOST || 'ec2-54-246-85-151.eu-west-1.compute.amazonaws.com',
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_DATABASE || 'd3brovi17tke3f',
    dialectOptions: { ssl: { rejectUnauthorized: false } },
    logging: false
});
