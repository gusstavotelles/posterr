import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export interface IPost {
  id: string;
  user_id: string;
  date_published: string;
  content: string;
  quotes: string[];
  reposts: number;
  is_repost: boolean;
  is_quote: boolean;
  reposted_post_id?: boolean;
  quoted_post_id?: boolean;
}
@Entity()
export class Post implements IPost {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id: string;
  @ApiProperty()
  @Column()
  public user_id: string;
  @ApiProperty()
  @Column()
  public date_published: string;
  @ApiProperty()
  @Column()
  public content: string;
  @ApiProperty()
  @Column()
  public quotes: string[];
  @ApiProperty()
  @Column()
  public reposts: number;
  @ApiProperty()
  @Column()
  public is_repost: boolean;
  @ApiProperty()
  @Column()
  public is_quote: boolean;
  @ApiProperty()
  @Column()
  public reposted_post_id?: boolean;
  @ApiProperty()
  @Column()
  public quoted_post_id?: boolean;
}
