import { FollowUserDto } from './dto/follow-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { FollowerRepository } from './follower.repository';
import { User } from './entities/user.entity';
import { Follower } from './entities/follower.entity';
import { GetUserDto } from './dto/get-user.dto';
import { GetPostDto } from '../post/dto/get-post.dto';
import { PostService } from '../post/post.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly followerRepository: FollowerRepository,
    private readonly postService: PostService,
  ) {}

  async generateUsers(): Promise<User[]> {
    try {
      return await this.userRepository.generateUsers();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async follow(follow: FollowUserDto): Promise<Follower> {
    try {
      if (!follow.followed_id || !follow.follower_id) {
        throw new HttpException('invalid user_id', HttpStatus.BAD_REQUEST);
      }
      if (follow.followed_id === follow.follower_id)
        throw new HttpException(
          "you can't follow yourself",
          HttpStatus.BAD_REQUEST,
        );
      if (
        (await this.userExists(follow.followed_id)) &&
        (await this.userExists(follow.follower_id))
      ) {
        const followResult = await this.followerRepository.follow(follow);
        return followResult;
      } else {
        throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async unfollow(follow: FollowUserDto) {
    try {
      if (follow.followed_id === follow.follower_id)
        throw new HttpException(
          "you can't unfollow yourself",
          HttpStatus.BAD_REQUEST,
        );
      if (
        (await this.userExists(follow.followed_id)) &&
        (await this.userExists(follow.follower_id))
      ) {
        const followResult = await this.followerRepository.unfollow(follow);
        return followResult;
      } else {
        throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async loadProfile(id: string, posts_count: number): Promise<GetUserDto> {
    try {
      let user = await this.userRepository.findOne(id);
      let posts: GetPostDto[] = [];

      let followers = await this.followerRepository.getFollowers(id);
      let following = await this.followerRepository.getFollowing(id);
      posts = await this.postService.findByUser(user.id, posts_count);
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        date_joined: this.convertDate(user.date_joined),
        followers: followers,
        following: following,
        posts: posts,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  private convertDate(date: string) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  private async userExists(user_id: string): Promise<boolean> {
    const response = await this.userRepository.findOne(user_id);
    return response ? true : false;
  }
}
