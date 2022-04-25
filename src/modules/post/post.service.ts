import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Interaction } from './entities/interaction.entity';
import { InteractionRepository } from './interaction.repository';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly interactionRepository: InteractionRepository,
  ) {}

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
      if (newPost.interaction_type) {
        const newInteraction: Interaction = {
          original_post_id: newPost.original_post_id,
          interaction_post_id: result.id,
          interaction_type: newPost.interaction_type,
        };
        await this.interactionRepository.insert(newInteraction);
      }
    } catch (error) {}

    return 'This action adds a new post';
  }

  loadHomePage() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }
  private async maxPostsReached(user_id: string): Promise<boolean> {
    const posts = await this.postRepository.findByUserToday(user_id);

    if (posts.length >= 5) {
      return false;
    } else {
      return true;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
