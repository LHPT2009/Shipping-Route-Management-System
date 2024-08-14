import { RoleEntity } from '../../role/entity/role.entity';

export default interface UserInterface {
  id: string;
  fullname: string;
  username: string;
  otp: string;
  email: string;
  phone_number: string;
  address: string;
  password: string;
  active: boolean;
  roles: RoleEntity;
}
