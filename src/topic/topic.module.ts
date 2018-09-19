import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TopicModel } from '../models/topic.model';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TopicModel])],
  providers: [TopicService],
  controllers: [TopicController],
  exports: [TopicService],
})
export class TopicModule {}