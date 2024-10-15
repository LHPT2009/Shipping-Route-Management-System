import { PermissionEntity } from '../../permission/entity/permission.entity';
import { UserEntity } from '../../user/entity/user.entity';

export default interface ContactInterface {
  id: string;
  fullname: string;
  email: string;
  phone_number: string;
  title: string;
  description: string;
}
