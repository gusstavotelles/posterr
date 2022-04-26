import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostDto } from './dto/get-post.dto';
import { Interaction } from './entities/interaction.entity';
import { Post } from './entities/post.entity';
import { InteractionRepository } from './interaction.repository';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
    private readonly interactionRepository: InteractionRepository,
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
    try {
      let response = [];
      for await (const post of this.postsMock) {
        const result = await this.create(post);
        response.push(result);
      }

      let posts = await this.postRepository.generatePosts();
      return posts;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async create(newPost: CreatePostDto) {
    if (this.maxPostsReached(newPost.user_id)) {
      throw new HttpException(
        "Today's max posts number reached",
        HttpStatus.BAD_REQUEST,
      );
    }
    if (newPost.content.length > 777) {
      throw new HttpException(
        'Maximum number of posts exceeded',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const result = await this.postRepository.insert(newPost);
      if (newPost.post_type !== 'POST' ) {
        const newInteraction: Interaction = {
          original_post_id: newPost.original_post_id,
          interaction_post_id: result.id,
        };
        await this.interactionRepository.insert(newInteraction);
      }
    } catch (error) {}

    return 'This action adds a new post';
  }

  async loadHomePage(postsLoaded: number): Promise<GetPostDto[]> {
    let posts;
    let response: GetPostDto[];
    try {
      posts = await this.postRepository.loadHomePage(postsLoaded);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    for await (const post of posts) {
      const result = await this.findOne(post.id);
      response.push(result);
    }
    return response;
  }

  async findOne(id: string): Promise<GetPostDto> {
    try {
      let post = await this.postRepository.findOne(id);
      let interactions = await this.getInteractions(id);
      return {
        id: post.id,
        user_id: post.user_id,
        content: post.content,
        username: (await this.userRepository.findOne(post.user_id)).username,
        date_published: post.date_published,
        original_post: await this.postRepository.findOne(post.original_post_id),
        post_type: post.post_type,
        quotes: interactions.quotes,
        reposts: interactions.reposts,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getInteractions(
    original_post_id: string,
  ): Promise<{ quotes: Post[]; reposts: Post[] }> {
    let interactions = await this.interactionRepository.getByOriginalPost(
      original_post_id,
    );
    let quotes: Post[] = [];
    let reposts: Post[] = [];

    for await (const interaction of interactions) {
      const result = await this.postRepository.findOne(
        interaction.interaction_post_id,
      );
      if (result.post_type === 'QUOTE') {
        quotes.push(result);
      } else if (result.post_type === 'REPOST') {
        reposts.push(result);
      }
    }
    return { quotes: quotes, reposts: reposts };
  }

  private async maxPostsReached(user_id: string): Promise<boolean> {
    const posts = await this.postRepository.findByUserToday(user_id);

    if (posts.length >= 5) {
      return false;
    } else {
      return true;
    }
  }
}
