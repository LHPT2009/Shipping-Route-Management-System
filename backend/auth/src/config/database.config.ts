import { User } from "src/modules/users/user.entity";


export const databaseConfig = {
    type: 'postgres',
    database: 'test',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'aB123789#',
    entities: [User],
    synchronize: true,
}