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
    synchronize: true, // env develop
    entities: [
        'apps/auth/src/modules/user/entity/*.{ts,js}',
        'apps/auth/src/modules/permission/entity/*.{ts,js}',
        'apps/auth/src/modules/role/entity/*.{ts,js}',
        'apps/auth/src/modules/refreshtoken/entity/*.{ts,js}',

        'apps/route/src/modules/location/entity/*.{ts,js}',
        'apps/route/src/modules/route/entity/*.{ts,js}',
        'apps/route/src/modules/transport/entity/*.{ts,js}',
    ],
    migrations: ['apps/migrations/src/*.{ts,js}'],
    migrationsTableName: "history-migrations",
    migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;