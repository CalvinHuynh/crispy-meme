import { Controller, Get, Param, Post, Body, Put, Delete, HttpStatus } from '@nestjs/common';
import { TopicService } from './topic.service';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';
import { TopicModel } from '../models/topic.model';
import { ApiUseTags } from '@nestjs/swagger';

import { CreateTopicDto } from './dto/create.topic.dto';
import { UpdateTopicDto } from './dto/update.topic.dto';
import { CreateTopicPostDto } from './dto/create.topic.post.dto';

@ApiUseTags('Topics')
@Controller('topics')
export class TopicController {
    constructor(
        private readonly topicService: TopicService,
        private readonly postService: PostService,
        private readonly userService: UserService) { }

    @Get()
    findAllTopics(): Promise<TopicModel[]> {
        return this.topicService.findAllTopics();
    }

    @Get(':category')
    async findTopicsByCategory(
        @Param('category') category: string): Promise<TopicModel[]> {
        return this.topicService.findTopicsByCategory(category);
    }

    @Get('users/:username')
    async findTopicByUserName(
        @Param('username') username: string) {
        const user = await this.userService.findUserByUsername(username);
        if (user !== undefined) {
            const topics = await this.topicService.findTopicsByUser(user.userId);
            if (topics.length > 0) {
                return topics;
            } else {
                return username + ' has no topics yet.';
            }
        } else {
            return HttpStatus.NOT_ACCEPTABLE;
        }
    }

    @Post(':username')
    async createTopic(
        @Body() topic: CreateTopicDto,
        @Param('username') username: string) {
        const user = await this.userService.findUserByUsername(username);
        if (user !== undefined) {
            topic.topicStarter = user;
            const newTopic = await this.topicService.createTopic(topic);
            return newTopic;
        } else {
            return HttpStatus.BAD_REQUEST;
        }
    }

    @Put(':topicId')
    async updateTopic(
        @Param('topicId') topicId: string,
        @Body() topic: UpdateTopicDto) {
        return await this.topicService.updateTopic(topicId, topic);
    }

    @Delete(':topicId')
    async deleteTopic(
        @Param('topicId') topicId: string) {
        await this.topicService.deleteTopic(topicId);
        return HttpStatus.OK;
    }

    @Post(':topicId/users/:username')
    async postInTopic(
        @Param('topicId') topicId: string,
        @Param('username') username: string,
        @Body() post: CreateTopicPostDto) {
        const user = await this.userService.findUserByUsername(username);
        if (user !== undefined) {
            post.user = user;
            const newPost = await this.postService.createPost(post);
            const topic = await this.topicService.findTopicById(topicId);
            topic.posts = [newPost];
            return await this.topicService.updateTopic(topicId, topic);
        } else {
            return HttpStatus.BAD_REQUEST;
        }
    }

}