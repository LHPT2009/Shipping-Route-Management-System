import { Role } from "../entity/role.entity";

export default interface PermissionInterface {
    id: string;
    name: string;
    role: Role[];
}