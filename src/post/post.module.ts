import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostModel } from '../models/post.model';

@Module({
  imports: [TypeOrmModule.forFeature([PostModel])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}