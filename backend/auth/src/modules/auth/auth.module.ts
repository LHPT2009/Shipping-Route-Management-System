import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { JwtStrategy } from './jwt-strategy';
import { ArtistsModule } from 'src/modules/artists/artists.module';
import { AuthResolver } from './auth.resolver';
import { ArtistsService } from 'src/modules/artists/artists.service';
import { UsersService } from 'src/modules/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/user.entity';
import { Artist } from 'src/modules/artists/artist.entity';

@Module({
  imports: [
    // UsersModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    // ArtistsModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Artist]),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver, ArtistsService, UsersService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
