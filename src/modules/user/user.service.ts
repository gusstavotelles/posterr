import { FollowUserDto } from './dto/follow-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { PostRepository } from '../post/post.repository';
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

  async loadProfile(id: string, posts_count: number): Promise<GetUserDto> {
    try {
      let user = await this.userRepository.findOne(id);
      // let followers: string[] = [];
      // let following: string[] = [];
      let posts: GetPostDto[] = [];

      let followers = await this.followerRepository.getFollowers(id);
      let following = await this.followerRepository.getFollowing(id);

      // user.followers = (await this.followerRepository.getFollowers(id)).map(
      //   (follow) => follow.follower_id,
      // );
      // for await (const follower_id of user.followers) {
      //   const result = await this.userRepository.findOne(follower_id);
      //   followers.push(result);
      // }

      // user.following = (await this.followerRepository.getFollowing(id)).map(
      //   (follow) => follow.followed_id,
      // );
      // for await (const follower_id of user.following) {
      //   const result = await this.userRepository.findOne(follower_id);
      //   following.push(result);
      // }
      posts = await this.postService.findByUser(user.id, posts_count);
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        date_joined: user.date_joined,
        followers: followers,
        following: following,
        posts: posts,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
