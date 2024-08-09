import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserId, UserRole } from './protos/auth';
import { ClientGrpc } from '@nestjs/microservices';

interface UserService {
  GetUserRoleById(data: UserId): Observable<UserRole>;
}

@Injectable()
export class AppService {

  private _userService: UserService;

  getHello(): string {
    return 'Gateway';
  }

  constructor(@Inject('AUTH_SERVICE_GRPC') private _client: ClientGrpc) {
    this._userService = this._client.getService<UserService>('UserService');
  }

  getUserRoleById(id: string): Observable<UserRole> {
    return this._userService.GetUserRoleById({ id });
  }

}
