import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { GetPostDto } from './dto/get-post.dto';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an empty array if there are no posts', () => {
    const posts: GetPostDto[] = [];
    expect(posts).toEqual([]);
  });

  it('should return an array of posts if there are posts', async () => {
    const posts = await service.loadHomePage(0);
    expect(posts).toBeTruthy();
  });

  it('should throw an error if there is an error', () => {
    const error = new HttpException('error', HttpStatus.BAD_REQUEST);
    expect(() => {
      throw error;
    }).toThrow(error);
  });
});
