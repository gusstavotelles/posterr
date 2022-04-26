import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { FollowUserDto } from './dto/follow-user.dto';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('user try to follow himself, should fail', async () => {
    const follow: FollowUserDto = { followed_id: '1', follower_id: '1' };
    expect(service.follow(follow)).rejects.toThrowError();
  });

  it('should return correct followed id', async () => {
    const follow: FollowUserDto = { followed_id: '1', follower_id: '2' };
    const followResult = await service.follow(follow);
    expect(followResult.followed_id).toEqual(follow.followed_id);
  });
  test('should return correct follower id', async () => {
    const follow: FollowUserDto = { followed_id: '2', follower_id: '1' };
    const followResult = await service.follow(follow);
    expect(followResult.follower_id).toEqual(follow.follower_id);
  });
});
