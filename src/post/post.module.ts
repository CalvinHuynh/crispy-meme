import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostModel } from '../models/post.model';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PostModel])],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}