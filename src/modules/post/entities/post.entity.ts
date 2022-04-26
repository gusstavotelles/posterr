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
  original_post_id?: string;
  post_type: 'POST' | 'REPOST' | 'QUOTE';
}
@Entity()
export class Post implements IPost {
  constructor(obj: IPost) {}

  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public user_id: string;

  @CreateDateColumn({ name: 'date_published' })
  public date_published!: string;

  @Column({ length: 777 })
  public content: string;

  @Column({
    nullable: true,
  })
  public original_post_id?: string;
  @Column()
  public post_type: 'POST' | 'REPOST' | 'QUOTE';
}

export enum PostType {
  POST = 'POST',
  REPOST = 'REPOST',
  QUOTE = 'QUOTE',
}
