import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostModel } from '../models/post.model';

import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostModel]), UserModule],
  providers: [PostService, UserService],
  controllers: [PostController],
})
export class PostModule {}