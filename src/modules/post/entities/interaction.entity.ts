import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export interface IInteraction {
  original_post_id: string;
  interaction_post_id: string;
}

@Entity()
export class Interaction implements IInteraction {
  constructor(obj: IInteraction) {
  }

  @PrimaryColumn()
  public original_post_id: string;

  @PrimaryColumn()
  public interaction_post_id: string;

}
