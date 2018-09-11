import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { UserModel } from '../models/user.model';
import { PostModel } from '../models/post.model';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get()
    findAll(): Promise<PostModel[]> {
        return this.postService.findAllPosts();
    }

    @Post()
    async saveOrUpdate(@Body() post: PostModel): Promise<PostModel> {
        return this.postService.saveOrUpdatePost(post);
    }

    // @Get(':username')
    // findByUsername(@Param('username') username: string): Promise<UserModel> {
    //     return this.postService.findUserByUsername(username);
    // }

    // @Post('delete')
    // async removeByUsername(@Body() user: UserModel): Promise<UserModel> {
    //     return this.postService.removeUserByUsername(user.username);
    // }
}