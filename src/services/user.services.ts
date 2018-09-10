import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Werkt nog niet
  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne(username);
  }

  async removeByUsername(user: User): Promise<User> {
    return await this.userRepository.remove(user);
  }

  async saveOrUpdate(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}