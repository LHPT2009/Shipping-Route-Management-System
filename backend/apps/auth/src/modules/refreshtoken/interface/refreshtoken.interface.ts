import { UserEntity } from "../../user/entity/user.entity";

export default interface RefreshTokenInterface {
    id: string;
    user: UserEntity;
    token: string;
}
