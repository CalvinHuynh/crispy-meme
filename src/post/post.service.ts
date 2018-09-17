import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostModel } from '../models/post.model';
import { CreatePostDto } from './dto/create.post.dto';
import { plainToClass } from 'class-transformer';
import { UpdatePostDto } from './dto/update.post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
  ) { }

  async findAllPosts(): Promise<PostModel[]> {
    return await this.postRepository.find();
  }

  async createPost(post: CreatePostDto): Promise<PostModel> {
    const newPost = plainToClass(PostModel, post);
    return await this.postRepository.save(newPost);
  }

  async findPostsByUser(uId: string): Promise<PostModel[]> {
    return await this.postRepository.createQueryBuilder()
      .where('userUserId = :userId', { userId: uId })
      .getMany();
  }

  async updatePost(post: UpdatePostDto, uId: string, pId: string): Promise<PostModel> {
    const postToUpdate =
      await this.postRepository.createQueryBuilder()
        .where('userUserId = :userId', { userId: uId })
        .andWhere('PostId = :postId', { postId: pId })
        .getOne();

    if (typeof postToUpdate === 'object') {
      postToUpdate.category = post.category;
      postToUpdate.text = post.text;
      postToUpdate.title = post.title;
      postToUpdate.attachment = post.attachment;
      postToUpdate.updatedDate = new Date();
      return await this.postRepository.save(postToUpdate);
    } else {
      return null;
    }
  }

  async deletePost(uId: string, pId: string) {
    const postToDelete =
      await this.postRepository.createQueryBuilder()
        .where('userUserId = :userId', { userId: uId })
        .andWhere('PostId = :postId', { postId: pId })
        .getOne();
    return await this.postRepository.delete(postToDelete);
  }
}