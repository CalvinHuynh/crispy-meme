import { Controller, Get, Param, Post, Body, Delete, HttpStatus, Patch } from '@nestjs/common';
import { TopicService } from './topic.service';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';
import { ApiUseTags } from '@nestjs/swagger';

import { CreateTopicDto } from './dto/create.topic.dto';
import { UpdateTopicDto } from './dto/update.topic.dto';
import { CreateTopicPostDto } from './dto/create.topic.post.dto';
import { DataModel } from '../models/data.model';
import { LinkModel, http } from '../models/link.model';

@ApiUseTags('Topics')
@Controller('topics')
export class TopicController {
    constructor(
        private readonly topicService: TopicService,
        private readonly postService: PostService,
        private readonly userService: UserService) { }

    @Get()
    async findAllTopics() {
        const dataModel = new DataModel();
        const topics = await this.topicService.findAllTopics();
        dataModel.data = topics;
        dataModel.links = [];
        return dataModel;
    }

    @Get(':category')
    async findTopicsByCategory(
        @Param('category') category: string) {
        const dataModel = new DataModel();
        const topicsByCategory = await this.topicService.findTopicsByCategory(category);
        dataModel.links = [];
        dataModel.data = topicsByCategory;
        return dataModel;
    }

    @Get('users/:username')
    async findTopicByUserName(
        @Param('username') username: string) {
        const dataModel = new DataModel();
        dataModel.links = [];
        const user = await this.userService.findUserByUsername(username);
        if (user !== undefined) {
            const topics = await this.topicService.findTopicsByUser(user.userId);
            if (topics.length > 0) {
                dataModel.data = topics;
                return dataModel;
            } else {
                dataModel.data = username + ' has no topics yet.';
                return dataModel;
            }
        } else {
            dataModel.data = null;
            return dataModel;
        }
    }

    @Post(':username')
    async createTopic(
        @Body() topic: CreateTopicDto,
        @Param('username') username: string) {
        const dataModel = new DataModel();
        dataModel.links = [];
        const user = await this.userService.findUserByUsername(username);
        if (user !== undefined) {
            topic.topicStarter = user;
            const newTopic = await this.topicService.createTopic(topic);
            dataModel.data = newTopic;
            return dataModel;
        } else {
            dataModel.data = null;
            return dataModel;
        }
    }

    @Patch(':topicId')
    async updateTopic(
        @Param('topicId') topicId: string,
        @Body() topic: UpdateTopicDto) {
        const dataModel = new DataModel();
        const link1 = new LinkModel({
            href: '/topics/' + topicId,
            method: http[http.DELETE],
            rel: 'self',
        });
        const updatedTopic = await this.topicService.updateTopic(topicId, topic);
        dataModel.data = updatedTopic;
        dataModel.links = [link1];
        return dataModel;
    }

    @Delete(':topicId')
    async deleteTopic(
        @Param('topicId') topicId: string) {
        const dataModel = new DataModel();
        const link1 = new LinkModel({
            href: '/topics/' + topicId,
            method: http[http.PATCH],
            rel: 'self',
        });
        await this.topicService.deleteTopic(topicId);
        dataModel.data = HttpStatus.OK;
        dataModel.links = [link1];
        return dataModel;
    }

    @Post(':topicId/users/:username')
    async postInTopic(
        @Param('topicId') topicId: string,
        @Param('username') username: string,
        @Body() post: CreateTopicPostDto) {
        const dataModel = new DataModel();
        dataModel.links = [];
        const user = await this.userService.findUserByUsername(username);
        if (user !== undefined) {
            post.user = user;
            const newPost = await this.postService.createPost(post);
            const topic = await this.topicService.findTopicById(topicId);
            topic.posts = [newPost];
            const postInTopic = await this.topicService.updateTopic(topicId, topic);
            dataModel.data = postInTopic;
            return dataModel;
        } else {
            dataModel.data = null;
            return dataModel;
        }
    }

}