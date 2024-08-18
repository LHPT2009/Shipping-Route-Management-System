import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import RefreshTokenInterface from '../interface/refreshtoken.interface';

@Entity('refreshtokens')
export class RefreshTokenEntity implements RefreshTokenInterface {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    userId: string;

    @Column()
    token: string;
}
