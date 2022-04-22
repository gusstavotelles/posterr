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
}
@Entity()
export class Post implements IPost {
  constructor(obj: IPost) {
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id: string;

  @ApiProperty()
  @Column()
  public user_id: string;

  @CreateDateColumn({ name: 'date_published' })
  date_published!: string;

  @ApiProperty()
  @Column({ length: 777 })
  public content: string;
}
