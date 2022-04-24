import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
export interface IPost {
  id: string;
  user_id: string;
  date_published: string;
  content: string;
}
@Entity()
export class Post implements IPost {
  constructor(obj: IPost) {
  }

  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public user_id: string;

  @CreateDateColumn({ name: 'date_published' })
  public date_published!: string;

  @Column({ length: 777 })
  public content: string;
}
