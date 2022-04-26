import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { FollowUserDto } from './dto/follow-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<UserController>(UserController);
    //userService = await moduleRef.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return 1 line affected on unfollow', async () => {
    const userFollowObject = new FollowUserDto();
    userFollowObject.follower_id = '1';
    userFollowObject.followed_id = '5';

    const response = await controller.unfollow(userFollowObject);

    expect(response.affected).toEqual(1);
  });

  it('should return the correct followed_id', async () => {
    const userFollowObject = new FollowUserDto();
    userFollowObject.follower_id = '1';
    userFollowObject.followed_id = '5';

    const response = await controller.follow(userFollowObject);

    expect(response.followed_id).toEqual('5');
  });

  it('should return the correct follower_id', async () => {
    const userFollowObject = new FollowUserDto();
    userFollowObject.follower_id = '3';
    userFollowObject.followed_id = '4';

    const response = await controller.follow(userFollowObject);

    expect(response.follower_id).toEqual('3');
  });
});
