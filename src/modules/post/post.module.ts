import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Post } from './entities/post.entity';
import { Interaction } from './entities/interaction.entity';
import { InteractionRepository } from './interaction.repository';
import { PostRepository } from './post.repository';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([Interaction]),
  ],
  controllers: [PostController],
  providers: [InteractionRepository, PostService, PostRepository],
  exports: [InteractionRepository, PostService, PostRepository],
})
export class PostModule {}
