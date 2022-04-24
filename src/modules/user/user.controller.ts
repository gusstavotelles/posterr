import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { FollowUserDto } from './dto/follow-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiTags('Follow User')
  @ApiOkResponse({ description: 'You are now Following this user' })
  async follow(@Body() createUserDto: FollowUserDto) {
    const newUser = await this.userService.follow(createUserDto);
    return newUser;
  }

  @Post()
  @ApiTags('Unfollow User')
  @ApiOkResponse({ description: 'User unfollowed' })
  async unfollow(@Body() createUserDto: FollowUserDto) {
    const newUser = await this.userService.follow(createUserDto);
    return newUser;
  }
}
