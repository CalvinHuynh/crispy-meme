import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.services';
import { User } from 'models/user.model';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post()
    async saveOrUpdate(@Body() user: User): Promise<User> {
        return this.userService.saveOrUpdate(user);
    }

    @Get(':username')
    findByUsername(@Param('username') username: string): Promise<User> {
        return this.userService.findByUsername(username);
    }

    @Post('delete')
    async removeByUsername(@Body() user: User): Promise<User> {
        return this.userService.removeByUsername(user.username);
    }
}