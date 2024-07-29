import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { JwtModule } from '@nestjs/jwt';
import { RouteResolver } from './route.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from '../email/email.service';
import { Route } from './entity/route.entity';
import { UsersResolver } from './user.resolver';
import { Transport } from './entity/transport.entity';
import { Location } from './entity/location.entity';

@Module({
  imports: [
    // UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    // ArtistsModule,
    TypeOrmModule.forFeature([Route, Location, Transport]),
  ],
  providers: [RouteService, RouteResolver, EmailService, UsersResolver],
  controllers: [RouteController],
  exports: [RouteService],
})
export class RouteModule {}
