import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.services';
import { User } from '../models/user.model';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':username')
    findByUsername(@Param('username') username: string): Promise<User> {
        return this.userService.findByUsername(username);
    }

    @Post(':username')
    async removeByUsername(@Param('username') username): Promise<User> {
        return this.userService.removeByUsername(username);
    }

    @Post()
    async saveOrUpdate(@Body() user: User): Promise<User> {
        return this.userService.saveOrUpdate(user);
    }
}