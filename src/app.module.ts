import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Interaction } from './modules/post/entities/interaction.entity';
import { Post } from './modules/post/entities/post.entity';
import { PostModule } from './modules/post/post.module';
import { Follower } from './modules/user/entities/follower.entity';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'posterr_docker',
      entities: [Post, User, Follower, Interaction],
      synchronize: true,
      logging: false,
      keepConnectionAlive: true,
      migrationsTableName: 'posterr_migrations',
      migrations: ['migration/*.js'],
    }),
    TypeOrmModule.forFeature([Post, User, Follower, Interaction]),
  ],
  exports: [UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
