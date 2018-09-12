import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

import { PostModule } from '../post/post.module';
import { PostService } from '../post/post.service';

import { TopicModel } from '../models/topic.model';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TopicModel]), UserModule, PostModule],
  providers: [TopicService, UserService, PostService],
  controllers: [TopicController],
})
export class TopicModule {}