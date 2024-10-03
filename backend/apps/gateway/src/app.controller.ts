import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UserRole } from './protos/auth';
import { Observable } from 'rxjs';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
  ) { }

  @Get('user-roles/:id')
  getUserRole(@Param('id') id: string): Observable<UserRole> {
    return this.appService.getUserRoleById(id);
  }

  @Get()
  getHello(): boolean {
    return true;
  }

}
