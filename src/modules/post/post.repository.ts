import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async insert(newPost: CreatePostDto): Promise<Post> {
    const result = await this.postRepository.save(newPost);
    return result;
  }

  loadHomePage(posts_count: number): Promise<Post[]> {
    return this.postRepository.find({ skip: posts_count, take: 10 });
  }

  findOne(id: string): Promise<Post> {
    return this.postRepository.findOneBy({
      id: id,
    });
  }

  findByUser(user_id: string, posts_count: number): Promise<Post[]> {
    return this.postRepository.find({
      where: [{ user_id: user_id }],
      skip: posts_count,
      take: 5,
    });
  }

  findByUserToday(user_id: string): Promise<Post[]> {
    return this.postRepository.find({
      where: {
        user_id,
        date_published: Like(`${new Date().toISOString().slice(0, 10)}%`),
      },
    });
  }
}
