import { Controller, Get, Param, Post, Body } from '@nestjs/common';
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
    async saveOrUpdate(@Body() user: UserModel): Promise<UserModel> {
        return this.userService.saveOrUpdateUser(user);
    }

    @Get(':username')
    findByUsername(@Param('username') username: string): Promise<UserModel> {
        return this.userService.findUserByUsername(username);
    }

    @Post('delete')
    async removeByUsername(@Body() user: UserModel): Promise<UserModel> {
        return this.userService.removeUserByUsername(user.username);
    }
}