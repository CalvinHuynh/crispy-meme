import { Controller, Get, Param, Post, Body, Patch, Delete, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { PostModel } from '../models/post.model';
import { UserService } from '../user/user.service';
import { ApiUseTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { DataModel } from '../models/data.model';
import { LinkModel, http } from '../models/link.model';

@ApiUseTags('Posts')
@Controller('posts')
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly userService: UserService) { }

    @Get()
    async findAllPosts() {
        const dataModel = new DataModel();
        const allPosts = await this.postService.findAllPosts();
        dataModel.data = allPosts;
        dataModel.links = [];
        return dataModel;
    }

    @Get(':username')
    async findPostsByUser(
        @Param('username') username: string) {
        const dataModel = new DataModel();
        const link1 = new LinkModel({
            href: '/posts/' + username,
            method: http[http.POST],
            rel: 'self',
        });
        dataModel.links = [link1];
        const user = await this.userService.findUserByUsername(username);
        if (user !== undefined) {
            const posts = await this.postService.findPostsByUser(user.userId);
            if (posts.length > 0) {
                dataModel.data = posts;
                return dataModel;
            } else {
                dataModel.data = username + ' has no posts yet.';
                return dataModel;
            }
        } else {
            return dataModel;
        }
    }

    @Post(':username')
    async createPost(
        @Body() post: CreatePostDto,
        @Param('username') username: string) {
        const dataModel = new DataModel();
        const link1 = new LinkModel({
            href: '/posts/' + username,
            method: http[http.GET],
            rel: 'self',
        });
        dataModel.links = [link1];
        const user = await this.userService.findUserByUsername(username);
        if (user !== undefined) {
            post.user = user;
            const newPost = await this.postService.createPost(post);
            dataModel.data = newPost;
            return dataModel;
        } else {
            dataModel.data = null;
            return dataModel;
        }
    }

    @Patch(':username/post/:postId')
    async updatePost(
        @Param('username') username: string,
        @Param('postId') postId: string,
        @Body() post: UpdatePostDto) {
        const dataModel = new DataModel();
        const link1 = new LinkModel({
            href: '/posts/' + username + '/post/' + postId,
            method: http[http.DELETE],
            rel: 'self',
        });
        const user = await this.userService.findUserByUsername(username);
        const updatedPost = await this.postService.updatePost(post, user.userId, postId);
        dataModel.data = updatedPost;
        dataModel.links = [link1];
        return dataModel;
    }

    @Delete(':username/post/:postId')
    async deletePost(
        @Param('username') username: string,
        @Param('postId') postId: string) {
        const dataModel = new DataModel();
        const link1 = new LinkModel({
            href: '/posts/' + username + '/post/' + postId,
            method: http[http.PATCH],
            rel: 'self',
        });
        const user = await this.userService.findUserByUsername(username);
        const deletedPost = await this.postService.deletePost(user.userId, postId);

        dataModel.data = deletedPost;
        dataModel.links = [link1];
        return dataModel;
    }
}