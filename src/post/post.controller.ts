import { Controller, Get, Param, Post, Body, Put, Delete, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { PostModel } from '../models/post.model';
import { UserService } from '../user/user.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Posts')
@Controller('posts')
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly userService: UserService) { }

    @Get()
    findAllPosts(): Promise<PostModel[]> {
        return this.postService.findAllPosts();
    }

    @Get(':username')
    async findPostsByUser(
        @Param('username') username: string) {
        const user = await this.userService.findUserByUsername(username);
        if (user !== undefined) {
            const posts = await this.postService.findPostsByUser(user.userId);
            if (posts.length > 0) {
                return posts;
            } else {
                return username + ' has no posts yet.';
            }
        } else {
            return HttpStatus.BAD_REQUEST;
        }
    }

    @Post(':username')
    async createPost(
        @Body() post: PostModel,
        @Param('username') username: string) {
        const user = await this.userService.findUserByUsername(username);
        if (user !== undefined) {
            post.user = user;
            const newPost = await this.postService.createPost(post);
            return newPost;
        } else {
            return HttpStatus.BAD_REQUEST;
        }
    }

    @Put(':username/post/:postId')
    async updatePost(
        @Param('username') username: string,
        @Param('postId') postId: string,
        @Body() post: PostModel): Promise<PostModel> {
        const user = await this.userService.findUserByUsername(username);
        return await this.postService.updatePost(post, user.userId, postId);
    }

    @Delete(':username/post/:postId')
    async deletePost(
        @Param('username') username: string,
        @Param('postId') postId: string) {
        const user = await this.userService.findUserByUsername(username);
        await this.postService.deletePost(user.userId, postId);
        return HttpStatus.OK;
    }
}