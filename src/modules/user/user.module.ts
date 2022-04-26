import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowerRepository } from './follower.repository';
import { Follower } from './entities/follower.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Follower]),
  ],
  controllers: [UserController],
  providers: [FollowerRepository, UserService, UserRepository],
  exports: [FollowerRepository, UserService, UserRepository],
})
export class UserModule {}
