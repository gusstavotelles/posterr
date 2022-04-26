import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FollowUserDto } from './dto/follow-user.dto';
import { User } from './entities/user.entity';
import { GetUserDto } from './dto/get-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('generate')
  @ApiTags('Generate Users')
  @ApiOkResponse({ description: 'Users Generated', type: User, isArray: false })
  async generateUsers(): Promise<User[]> {
    const response = await this.userService.generateUsers();
    return response;
  }

  @Post('follow')
  @ApiTags('Follow User')
  @ApiOkResponse({ description: 'You are now Following this user' })
  async follow(@Body() followUserDto: FollowUserDto) {
    const response = await this.userService.follow(followUserDto);
    return response;
  }

  @Post('unfollow')
  @ApiTags('Unfollow User')
  @ApiOkResponse({ description: 'User unfollowed' })
  async unfollow(@Body() followUserDto: FollowUserDto) {
    const response = await this.userService.unfollow(followUserDto);
    return response;
  }

  @Get('loadProfile/:id/:posts_count')
  @ApiTags('Load Profile')
  async loadProfile(
    @Param('id') id: string,
    @Param('posts_count') posts_count: number,
  ): Promise<GetUserDto> {
    const user = await this.userService.loadProfile(id, posts_count);
    return user;
  }
}
