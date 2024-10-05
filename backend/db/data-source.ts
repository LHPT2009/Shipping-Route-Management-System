import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    entities: [
        'apps/**/entity/*.{ts,js}',
    ],
    migrations: ['db/migrations/*.{ts,js}'],
    migrationsTableName: "history-migrations",
    migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;