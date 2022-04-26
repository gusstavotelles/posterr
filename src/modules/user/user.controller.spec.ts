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

  it('should return an error if follower_id is undefined', () => {
    const userFollowObject = new FollowUserDto();
    userFollowObject.followed_id = '1234';

    const response = controller.follow(userFollowObject);
    expect(response).toBeUndefined();
  });

  it('should return an error if followed_id is undefined', () => {
    const userFollowObject = new FollowUserDto();
    userFollowObject.follower_id = '1234';

    const response = controller.follow(userFollowObject);
    expect(response).toBeUndefined();
  });

  it('should return a response of "You are now following this user"', () => {
    const userFollowObject = new FollowUserDto();
    userFollowObject.follower_id = '1234';
    userFollowObject.followed_id = '5678';

    const response = controller.follow(userFollowObject);

    expect(response).toEqual('You are now following this user');
  });
});
