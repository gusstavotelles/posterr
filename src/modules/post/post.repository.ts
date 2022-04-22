import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async insertUpdate(newPost: CreatePostDto) {
    const result = await this.postRepository.save(newPost);
    return result;
  }

  // homepage
  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  // for profile
  findByUser(user_id: string, posts_count: number): Promise<Post[]> {
    return this.postRepository.find({
      where: [{ user_id: user_id }],
      skip: posts_count,
      take: 5,
    });
  }
}
