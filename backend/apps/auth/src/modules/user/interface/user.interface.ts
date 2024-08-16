import { RoleEntity } from '../../role/entity/role.entity';

export default interface UserInterface {
  id: string;
  fullname: string;
  username: string;
  email: string;
  phone_number: string;
  address: string;
  password: string;
  active: boolean;
  verify_token: string;
  verify_token_expires: Date;
  roles: RoleEntity;
}
