import { Controller, Get, Param, Post, Body, Delete, Put, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from '../models/user.model';
import { ApiUseTags } from '@nestjs/swagger';

import { DataModel } from '../models/data.model';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@ApiUseTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll() {
        const dataModel = new DataModel();
        const users = await this.userService.findAllUsers();
        dataModel.data = users;
        return dataModel;
    }

    @Post()
    async createUser(@Body() user: CreateUserDto): Promise<UserModel> {
        return this.userService.createUser(user);
    }

    @Get(':username')
    async findByUsername(@Param('username') username: string): Promise<UserModel> {
        return this.userService.findUserByUsername(username);
    }

    @Put(':username')
    async updateUser(
        @Param('username') username: string,
        @Body() user: UpdateUserDto): Promise<UserModel> {
        return this.userService.updateUser(username, user);
    }

    @Delete(':username')
    async removeByUsername(
        @Param('username') username: string) {
        this.userService.removeUserByUsername(username);
        return HttpStatus.OK;
    }
}