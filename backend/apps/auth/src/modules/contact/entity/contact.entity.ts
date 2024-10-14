import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ContactInterface from '../interface/contact.interface';

@Entity('contacts')
export class ContactEntity implements ContactInterface {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fullname: string;

  @Column()
  phone_number: string;

  @Column()
  email: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  created_at: Date;

  constructor(fullname: string, email: string, phone_number: string, title: string, description: string, created_at: Date) {
    this.fullname = fullname;
    this.email = email;
    this.phone_number = phone_number;
    this.title = title;
    this.description = description;
    this.created_at = created_at;
  }
}
