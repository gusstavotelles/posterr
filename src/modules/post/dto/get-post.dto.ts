import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../entities/post.entity';
export interface IGetPostDto {
  id: string;
  user_id: string;
  content: string;
  username: string;
  date_published: string;
  original_post?: Post;
  post_type?: 'POST' | 'REPOST' | 'QUOTE';
  quotes?: Post[];
  reposts?: Post[];
}

export class GetPostDto implements IGetPostDto {
  public id: string;
  public user_id: string;
  public content: string;
  public username: string;
  public date_published: string;
  public original_post?: Post;
  public post_type?: 'POST' | 'REPOST' | 'QUOTE';
  public quotes?: Post[];
  public reposts?: Post[];
}
