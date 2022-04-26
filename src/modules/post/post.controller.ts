import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetPostDto } from './dto/get-post.dto';
import { Post as PostEntity } from './entities/post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('loadHomepage')
  @ApiTags('HomePage')
  @ApiOkResponse({
    description: 'Homepage loaded successfully',
    type: GetPostDto,
    isArray: true,
  })
  async findAll(@Req() postsLoaded: number) {
    const posts = await this.postService.loadHomePage(postsLoaded);
    return posts;
  }

  @Post('generatePosts')
  @ApiTags('Generate Posts')
  @ApiOkResponse({
    description: 'Posts Generated',
    type: PostEntity,
    isArray: false,
  })
  async generatePosts(): Promise<PostEntity[]> {
    const response = await this.postService.generatePosts();
    return response;
  }

  @Post('createPost')
  @ApiTags('Create New Post')
  @ApiOkResponse({ description: 'Post Created' })
  async create(@Body() createPostDto: CreatePostDto) {
    const newPost = await this.postService.create(createPostDto);
    return newPost;
  }
}
