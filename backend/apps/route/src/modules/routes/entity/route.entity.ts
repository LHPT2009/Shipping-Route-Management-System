import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  user_id: string;
  
  /**
   * A user can create many playLists
   */
}
