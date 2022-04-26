import { ApiProperty } from '@nestjs/swagger';
export interface ICreatePostDto {
  user_id: string;
  content: string;
  original_post_id?: string;
  post_type?: 'POST' | 'REPOST' | 'QUOTE';
}

export class CreatePostDto implements ICreatePostDto {
  @ApiProperty()
  public user_id: string;

  @ApiProperty()
  public content: string;

  @ApiProperty()
  public original_post_id?: string;

  @ApiProperty()
  public post_type?: 'POST' | 'REPOST' | 'QUOTE';
}
