import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async insert(newPost: CreatePostDto): Promise<CreatePostDto & Post> {
    const result = await this.postRepository.save(newPost);
    return result;
  }

  // homepage
  async findAll(posts_count: number): Promise<Post[]> {
    return this.postRepository.find({ skip: posts_count, take: 10 });
  }

  // for profile
  findByUser(user_id: string, posts_count: number): Promise<Post[]> {
    return this.postRepository.find({
      where: [{ user_id: user_id }],
      skip: posts_count,
      take: 5,
    });
  }

  findByUserToday(user_id: string): Promise<Post[]> {
    return this.postRepository.find({
      where: [{ user_id: user_id, date_published: moment().format() }],
    });
  }
}
