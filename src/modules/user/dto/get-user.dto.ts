import { ApiProperty } from '@nestjs/swagger';
import { GetPostDto } from 'src/modules/post/dto/get-post.dto';
import { User } from '../entities/user.entity';
export interface IGetUserDto {
  id: string;
  name: string;
  username: string;
  date_joined: string;
  followers: string[];
  following: string[];
  posts: GetPostDto[];
}

export class GetUserDto implements IGetUserDto {
  public id: string;
  public name: string;
  public username: string;
  public date_joined: string;
  public followers: string[];
  public following: string[];
  public posts: GetPostDto[];
}
