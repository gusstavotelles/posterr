import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import { Post } from './modules/post/entities/post.entity';
import { Follower } from './modules/user/entities/follower.entity';
import { Interaction } from './modules/post/entities/interaction.entity';

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
      dropSchema: true,
      migrationsTableName: 'posterr_migrations',
      migrations: ['migration/*.js'],
    }),
  ],
  exports: [UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
