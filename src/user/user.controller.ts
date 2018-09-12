import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from '../models/user.model';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll(): Promise<UserModel[]> {
        return this.userService.findAllUsers();
    }

    @Post()
    async createUser(@Body() user: UserModel): Promise<UserModel> {
        return this.userService.createUser(user);
    }

    @Put()
    async updateUser(@Body() user: UserModel): Promise<UserModel> {
        return this.userService.updateUser(user);
    }

    @Get(':username')
    async findByUsername(@Param('username') username: string): Promise<UserModel> {
        return this.userService.findUserByUsername(username);
    }

    @Delete(':username')
    async removeByUsername(
        @Param('username') username: string) {
        return this.userService.removeUserByUsername(username)
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err));
    }
}