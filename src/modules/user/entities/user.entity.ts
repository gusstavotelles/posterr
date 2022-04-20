import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export interface IUser {
  id: string;
  name: string;
  username: string;
  date_joined: string;
  followers: number;
  following: number;
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
  @Column()
  public username: string;
  @ApiProperty()
  @Column()
  public date_joined: string;
  @ApiProperty()
  @Column()
  public followers: number;
  @ApiProperty()
  @Column()
  public following: number;
  @ApiProperty()
  @Column()
  public posts_count: number;
}
