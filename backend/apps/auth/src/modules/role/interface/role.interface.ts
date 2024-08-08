import { PermissionEntity } from '../../permission/entity/permission.entity';
import { UserEntity } from '../../user/entity/user.entity';

export default interface RoleInterface {
  id: string;
  name: string;
  user: UserEntity[];
  permission: PermissionEntity[];
}
