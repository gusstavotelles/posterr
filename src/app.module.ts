import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { Interaction } from './modules/post/entities/interaction.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Post } from './modules/post/entities/post.entity';
import { Follower } from './modules/user/entities/follower.entity';
import { PostModule } from './modules/post/post.module';

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
      migrationsTableName: 'posterr_migrations',
      migrations: ['migration/*.js'],
      logging: false,
      keepConnectionAlive: true,
    }),
    TypeOrmModule.forFeature([Post, User, Follower, Interaction]),
  ],
  exports: [UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
