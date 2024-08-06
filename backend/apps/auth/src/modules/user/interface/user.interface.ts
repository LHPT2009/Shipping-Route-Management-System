import { RoleEntity } from '../../role/entity/role.entity';

export default interface UserInterface {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  password: string;
  active: boolean;
  role: RoleEntity;
}
