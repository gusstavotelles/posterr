import { FollowUserDto } from './dto/follow-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { PostRepository } from '../post/post.repository';
import { FollowerRepository } from './follower.repository';
import { User } from './entities/user.entity';
import { Follower } from './entities/follower.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly followerRepository: FollowerRepository,
  ) {}

  async generateUsers(): Promise<User[]> {
    return await this.userRepository.generateUsers();
  }

  async follow(follow: FollowUserDto): Promise<Follower> {
    try {
      const followResult = await this.followerRepository.follow(follow);
      return followResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async unfollow(follow: FollowUserDto) {
    try {
      const followResult = await this.followerRepository.unfollow(follow);
      return followResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async loadProfile(id: string): Promise<User> {
    let user = await this.userRepository.findOne(id);
    user.followers = (await this.followerRepository.getFollowers(id)).map(
      (follow) => follow.follower_id,
    );
    user.following = (await this.followerRepository.getFollowing(id)).map(
      (follow) => follow.followed_id,
    );
    return user;
  }
}
