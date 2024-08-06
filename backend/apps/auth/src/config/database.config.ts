import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../modules/user/entity/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  database: process.env.POSTGRES_NAME,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [UserEntity],
  synchronize: true,
};
