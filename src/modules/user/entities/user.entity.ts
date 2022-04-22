import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
export interface IUser {
  id: string;
  name: string;
  username: string;
  date_joined: string;
  followers: string[];
  following: string[];
  posts_count: number;
}
@Entity()
export class User implements IUser {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id: string;

  @ApiProperty()
  @Column()
  public name: string;

  @ApiProperty()
  @Column({ length: 14 })
  public username: string;

  // @ApiProperty()
  // @Column()
  // public date_joined: string;

  @CreateDateColumn({ name: 'date_joined' })
  date_joined!: string;

  @ApiProperty()
  public followers: string[];

  @ApiProperty()
  public following: string[];

  @ApiProperty()
  @Column()
  public posts_count: number;
}
