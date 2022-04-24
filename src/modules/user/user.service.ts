import { Injectable } from '@nestjs/common';
import { FollowUserDto } from './dto/follow-user.dto';

@Injectable()
export class UserService {
  follow(createUserDto: FollowUserDto) {
    return 'This action adds a new user';
  }

  unfollow(createUserDto: FollowUserDto) {
    return 'This action adds a new user';
  }
}
