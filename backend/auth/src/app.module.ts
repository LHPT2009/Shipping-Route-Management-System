import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { SongsController } from './modules/songs/songs.controller';

//entities
import { Song } from './modules/songs/song.entity';
import { Artist } from './modules/artists/artist.entity';
import { User } from './modules/users/user.entity';

//modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { SongsModule } from './modules/songs/songs.module';

//graphql
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import formatError from './utils/exception/format-error';
import { NonEmptyStringScalar } from './utils/exception/validation-graphql/non-empty-string';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'test',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'aB123789#',
      entities: [Song, Artist, User],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      formatError: formatError,
      context: ({ req }) => ({ req }),
    }),
    SongsModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(/*private dataSource: DataSource*/) {
    // console.log('dbName ', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // option no 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); //option no 2

    consumer.apply(LoggerMiddleware).forRoutes(SongsController); //option no 3
  }
}
