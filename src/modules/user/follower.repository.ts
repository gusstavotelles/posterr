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

  async follow(follow_obj: Follower) {
    const result = await this.followerRepository.save(follow_obj);
    return result;
  }

  async unfollow(follow_obj: Follower) {
    const result = await this.followerRepository.delete({
      follower_id: follow_obj.follower_id,
      followed_id: follow_obj.followed_id,
    });
    return result;
  }

  async findAll(): Promise<Follower[]> {
    return this.followerRepository.find();
  }

  async getFollowers(id: string): Promise<string[]> {
    return (
      await this.followerRepository.find({ where: { followed_id: id } })
    ).map((follower) => follower.follower_id);
  }

  async getFollowing(id: string): Promise<string[]> {
    return (
      await this.followerRepository.find({ where: { follower_id: id } })
    ).map((follower) => follower.followed_id);
  }
}
