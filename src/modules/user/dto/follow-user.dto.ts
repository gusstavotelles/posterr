import { ApiProperty } from '@nestjs/swagger';
export interface IFollowUserDto {
  follower_id: string;
  followed_id: string;
}

export class FollowUserDto implements IFollowUserDto {
  @ApiProperty()
  public follower_id: string;

  @ApiProperty()
  public followed_id: string;
}
