import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowerRepository } from './follower.repository';
import { Follower } from './entities/follower.entity';
import { Post } from '../post/entities/post.entity';
import { PostService } from '../post/post.service';
import { PostRepository } from '../post/post.repository';
import { InteractionRepository } from '../post/interaction.repository';
import { Interaction } from '../post/entities/interaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([Interaction]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Follower]),
  ],
  controllers: [UserController],
  providers: [
    PostService,
    PostRepository,
    FollowerRepository,
    InteractionRepository,
    UserService,
    UserRepository,
  ],
  exports: [
    PostService,
    PostRepository,
    FollowerRepository,
    InteractionRepository,
    UserService,
    UserRepository,
  ],
})
export class UserModule {}
