import { Injectable } from '@nestjs/common';
import { Follower } from './entities/follower.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FollowerRepository {
  constructor(
    @InjectRepository(Follower)
    private followerRepository: Repository<Follower>,
  ) {}

  async follow(followObj: Follower) {
    const result = await this.followerRepository.save(followObj);
    return result;
  }

  async unfollow(followObj: Follower) {
    const result = await this.followerRepository.delete({
      follower_id: followObj.follower_id,
      followed_id: followObj.followed_id,
    });
    return result;
  }

  async findAll(): Promise<Follower[]> {
    return this.followerRepository.find();
  }

  async getFollowers(id: string): Promise<Follower[]> {
    return this.followerRepository.find({ where: { followed_id: id } });
  }

  async getFollowing(id: string): Promise<Follower[]> {
    return this.followerRepository.find({ where: { follower_id: id } });
  }
}
