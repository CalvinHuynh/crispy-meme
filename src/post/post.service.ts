import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostModel } from '../models/post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
  ) { }

  async findAllPosts(): Promise<PostModel[]> {
    return await this.postRepository.find();
  }

  async saveOrUpdatePost(post: PostModel): Promise<PostModel> {
    return await this.postRepository.save(post);
  }

//   async findByUsername(username: string): Promise<User> {
//     return await this.postRepository.createQueryBuilder()
//     .where('Username = :name', { name: username })
//     .getOne();
//   }

//   async removeByUsername(username: string): Promise<User> {
//     const user = await this.postRepository.createQueryBuilder()
//       .where('Username = :name', {name: username})
//       .getOne();

//     return await this.postRepository.remove(user);
//   }
}