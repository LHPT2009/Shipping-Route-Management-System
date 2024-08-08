import { RoleEntity } from '../../role/entity/role.entity';

export default interface PermissionInterface {
  id: string;
  name: string;
  roles: RoleEntity[];
}
