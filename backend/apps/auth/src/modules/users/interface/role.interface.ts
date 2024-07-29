
import { Permission } from "../entity/permission.entity";
import { User } from "../entity/user.entity";

export default interface RoleInterface {
    id: string;
    name: string;
    user: User;
    permission: Permission[];
}