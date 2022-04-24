import { ApiProperty } from '@nestjs/swagger';
export interface IFollowUserDto {
  user_id: string;
  content: string;
  original_post_id?: string;
}

export class FollowUserDto implements IFollowUserDto {
  @ApiProperty()
  public user_id: string;

  @ApiProperty()
  public content: string;

  @ApiProperty()
  public original_post_id?: string;

}
