import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../models/user.model';

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

  async createUser(user: UserModel): Promise<UserModel> {
    // Create new user
    const newUser = new UserModel({
      username: user.username,
      email: user.email,
      birthDate: user.birthDate,
    });
    // Check to see if it is possible use the then and catch
    // to return the corresponding httpstatus code
    return await this.userRepository.save(newUser)
      .then(res => Promise.resolve(res))
      .catch(err => Promise.reject(err));
  }

  async updateUser(user: UserModel): Promise<UserModel> {
    const userToUpdate =
      await this.userRepository.createQueryBuilder()
        .where('Username = :name', { name: user.username })
        .getOne();
    if (typeof userToUpdate === 'object') {
      userToUpdate.email = user.email;
      userToUpdate.birthDate = user.birthDate;
      userToUpdate.posts = user.posts;
      return await this.userRepository.save(userToUpdate);
    } else {
      return null;
    }
  }
}