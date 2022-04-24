import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowUserDto } from './dto/follow-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async follow(newUser: FollowUserDto) {
    //const result = await this.userRepository.save(newUser);
    return 'result';
  }

  async unfollow(newUser: FollowUserDto) {
    //const result = await this.userRepository.save(newUser);
    return 'result';
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // async findOne(document: string) {
  //   return this.userRepository.findOne({ where: { document: document } });
  // }
}
