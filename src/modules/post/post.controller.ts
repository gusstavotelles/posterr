import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiTags('Create New Post')
  @ApiOkResponse({ description: 'Post Created' })
  async create(@Body() createPostDto: CreatePostDto) {
    const newPost = await this.postService.create(createPostDto);
    return newPost;
  }

  // @Get(':document')
  // @ApiTags('Find Posts By Account')
  // @ApiOkResponse({
  //   description: 'Get Posts by Account Successful',
  //   type: Post,
  //   isArray: true,
  // })
  // async findByAccount(
  //   @Param('document') document: string,
  // ): Promise<Post[]> {
  //   const post = await this.postService.findByAccount(document);
  //   return post;
  // }

  // @Get()
  // findAll() {
  //   return this.postService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }
}
