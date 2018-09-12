import { Controller, Get, Param, Post, Body, Put, Delete, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { PostModel } from '../models/post.model';

import { UserService } from '../user/user.service';

@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly userService: UserService) { }

    @Get()
    findAllPosts(): Promise<PostModel[]> {
        return this.postService.findAllPosts();
    }

    @Get(':username')
    async findPostByUser(
        @Param('username') username: string): Promise<PostModel[]> {
        const user = await this.userService.findUserByUsername(username);
        return await this.postService.findPostsByUser(user.userId);
    }

    @Post(':username')
    async createPost(
        @Body() post: PostModel,
        @Param('username') username: string): Promise<PostModel> {
        const user = await this.userService.findUserByUsername(username);
        post.user = user;

        const newPost = await this.postService.createPost(post);
        return newPost;
    }

    @Put(':username/:postId')
    async updatePost(
        @Param('username') username: string,
        @Param('postId') postId: number,
        @Body() post: PostModel): Promise<PostModel> {
        const user = await this.userService.findUserByUsername(username);
        return await this.postService.updatePost(post, user.userId, postId);
    }

    @Delete(':username/:postId')
    async deletePost(
        @Param('username') username: string,
        @Param('postId') postId: number) {
        const user = await this.userService.findUserByUsername(username);
        await this.postService.deletePost(user.userId, postId);
        return HttpStatus.OK;
    }
}