import { Song } from 'src/modules/songs/song.entity';
import { User } from 'src/modules/users/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  // @ManyToMany(() => Song, (song) => song.artists)
  // songs: Song[];
}
