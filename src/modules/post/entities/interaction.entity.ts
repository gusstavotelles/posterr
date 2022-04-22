import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export interface IInteraction {
  original_post_id: string;
  interaction_post_id: string;
  interaction_type: InteractionType;
}

@Entity()
export class Interaction implements IInteraction {
  constructor(obj: IInteraction) {
  }

  @ApiProperty()
  @PrimaryColumn()
  public original_post_id: string;

  @ApiProperty()
  @PrimaryColumn()
  public interaction_post_id: string;

  @ApiProperty()
  @Column()
  public interaction_type: InteractionType;
}

export enum InteractionType {
  REPOST = 'REPOST',
  QUOTE = 'QUOTE'
}
