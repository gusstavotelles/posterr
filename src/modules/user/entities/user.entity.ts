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
}
@Entity()
export class User implements IUser {
  constructor(obj: IUser) {
    Object.entries(obj).forEach(([key, value]) =>
      Object.assign(this, { [key]: value }),
    );
  }

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
}
