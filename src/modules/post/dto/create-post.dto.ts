import { ApiProperty } from '@nestjs/swagger';
import { InteractionType } from '../entities/interaction.entity';
export interface ICreatePostDto {
  user_id: string;
  content: string;
  original_post_id?: string;
  interaction_type?: InteractionType;
}

export class CreatePostDto implements ICreatePostDto {
  @ApiProperty()
  public user_id: string;

  @ApiProperty()
  public content: string;

  @ApiProperty()
  public original_post_id?: string;
  
  @ApiProperty()
  public interaction_type?: InteractionType;
}
