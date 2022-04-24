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

  async findAll(): Promise<Follower[]> {
    return this.followerRepository.find();
  }

  // async findOne(document: string) {
  //   return this.followerRepository.findOne({ where: { document: document } });
  // }
}
