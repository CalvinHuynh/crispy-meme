import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TopicModule } from './topic/topic.module';
import { PostController } from './post/post.controller';
import { TopicController } from './topic/topic.controller';
import { UserController } from './user/user.controller';
import { PostService } from './post/post.service';
import { TopicService } from './topic/topic.service';
import { UserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    PostModule,
    TopicModule],
  controllers: [PostController, TopicController, UserController],
  providers: [PostService, TopicService, UserService],
})

export class AppModule { }
