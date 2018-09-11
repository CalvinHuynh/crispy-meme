import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../models/user.model';
import { isNullOrUndefined } from 'util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) { }

  async findAllUsers(): Promise<UserModel[]> {
    return await this.userRepository.find();
  }

  async findUserByUsername(username: string): Promise<UserModel> {
    return await this.userRepository.createQueryBuilder()
      .where('Username = :name', { name: username })
      .getOne();
  }

  async removeUserByUsername(username: string): Promise<UserModel> {
    const user = await this.userRepository.createQueryBuilder()
      .where('Username = :name', { name: username })
      .getOne();

    return await this.userRepository.remove(user);
  }

  async saveOrUpdateUser(user: UserModel): Promise<UserModel> {
    const userToSaveOrUpdate =
      await this.userRepository.createQueryBuilder()
        .where('Username = :name', { name: user.username })
        .getOne();

    // Update existing user
    if (typeof userToSaveOrUpdate === 'object') {
      userToSaveOrUpdate.email = user.email;
      userToSaveOrUpdate.birthDate = user.birthDate;
      return await this.userRepository.save(userToSaveOrUpdate);
    } else {
    // Create new user
      return await this.userRepository.save(user);
    }
  }
}