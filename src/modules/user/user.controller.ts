import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiTags('Create New User')
  @ApiOkResponse({ description: 'User done' })
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    return newUser;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // @Get(':document')
  // @ApiTags('Find Users By Account')
  // @ApiOkResponse({
  //   description: 'Get Users by Account Successful',
  //   type: User,
  //   isArray: true,
  // })
  // async findByAccount(
  //   @Param('document') document: string,
  // ): Promise<User[]> {
  //   const user = await this.userService.findByAccount(document);
  //   return user;
  // }
}
