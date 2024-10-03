import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import RefreshTokenInterface from '../interface/refreshtoken.interface';
import { UserEntity } from '../../user/entity/user.entity';

@Entity('refresh_tokens')
export class RefreshTokenEntity implements RefreshTokenInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => UserEntity, user => user.refreshTokens)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  token: string;
}
