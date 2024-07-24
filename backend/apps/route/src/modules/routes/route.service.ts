import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Route } from './entity/route.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from '../email/email.service';
import { User } from './types/user.types';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
    private emailService: EmailService, // 1.
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<Route[]> {
    // const getAllRoutes = await this.routeRepository.find();
    return await this.routeRepository.find();
  }

  async forAuthor(id: string): Promise<Route[]> {
    return await this.routeRepository.findBy({ "user_id": id });
  }

  // getUser(user_id: string): User {
  //   return { id: "1" } as User;
  // }

}
