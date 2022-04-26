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

  private postsMock: CreatePostDto[] = [
    {
      user_id: '1',
      content: 'This is a post',
      original_post_id: null,
      post_type: 'POST',
    },
    {
      user_id: '2',
      content: 'I can see your post',
      original_post_id: '1',
      post_type: 'QUOTE',
    },
    {
      user_id: '3',
      content: 'this is a cool post!! ',
      original_post_id: '1',
      post_type: 'REPOST',
    },
    {
      user_id: '2',
      content: 'And another one.....',
      original_post_id: null,
      post_type: 'POST',
    },
    {
      user_id: '3',
      content: 'Keep going guys!',
      original_post_id: null,
      post_type: 'POST',
    },
    {
      user_id: '1',
      content: 'Almost there',
      original_post_id: null,
      post_type: 'POST',
    },
    {
      user_id: '2',
      content: 'A few more to go',
      original_post_id: null,
      post_type: 'POST',
    },
    {
      user_id: '1',
      content: 'Getting there',
      original_post_id: '4',
      post_type: 'REPOST',
    },
    {
      user_id: '3',
      content: '',
      original_post_id: '5',
      post_type: 'REPOST',
    },
    {
      user_id: '1',
      content: "And we're done",
      original_post_id: '7',
      post_type: 'QUOTE',
    },
  ];

  async generatePosts(): Promise<Post[]> {
    let result: Post[] = [];
    for await (const post of this.postsMock) {
      const savedPost = await this.postRepository.save(post);
      result.push(savedPost);
    }
    return result;
  }

  async insert(newPost: CreatePostDto): Promise<Post> {
    const result = await this.postRepository.save(newPost);
    return result;
  }

  // homepage
  async loadHomePage(posts_count: number): Promise<Post[]> {
    return this.postRepository.find({ skip: posts_count,take: 10 });
  }

  findOne(id: string): Promise<Post> {
    return this.postRepository.findOneBy({
      id: id,
    });
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
