import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryColumn,
} from 'typeorm';

export interface IFollower {
  follower_id: string;
  followed_id: string;
}
@Entity()
export class Follower implements IFollower {
  constructor(obj: IFollower) {
  }

  @PrimaryColumn()
  public follower_id: string;

  @PrimaryColumn()
  public followed_id: string;
}
