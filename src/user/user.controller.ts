import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiUseTags } from '@nestjs/swagger';

import { DataModel } from '../models/data.model';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { LinkModel, http } from 'models/link.model';

@ApiUseTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll() {
        const dataModel = new DataModel();
        const link1 = new LinkModel({
            href: '/users/',
            method: http[http.POST],
            rel: 'self',
        });
        const users = await this.userService.findAllUsers();
        dataModel.data = users;
        dataModel.links = [link1];
        return dataModel;
    }

    @Post()
    async createUser(@Body() user: CreateUserDto) {
        const dataModel = new DataModel();
        const link1 = new LinkModel({
            href: '/users/',
            method: http[http.GET],
            rel: 'self',
        });
        this.userService.createUser(user);
        dataModel.links = [link1];
        return dataModel;
    }

    @Get(':username')
    async findByUsername(@Param('username') username: string) {
        const dataModel = new DataModel();
        const link1 = new LinkModel({
            href: '/users/' + username,
            method: http[http.PATCH],
            rel: 'self',
        });
        const link2 = new LinkModel({
            href: '/users/' + username,
            method: http[http.DELETE],
            rel: 'self',
        });
        const user = await this.userService.findUserByUsername(username);
        dataModel.data = user;
        dataModel.links = [link1, link2];
        return dataModel;
    }

    @Patch(':username')
    async updateUser(
        @Param('username') username: string,
        @Body() user: UpdateUserDto) {
        const dataModel = new DataModel();
        const link1 = new LinkModel({
            href: '/users/' + username,
            method: http[http.GET],
            rel: 'self',
        });
        const link2 = new LinkModel({
            href: '/users/' + username,
            method: http[http.DELETE],
            rel: 'self',
        });
        const updatedUser = await this.userService.updateUser(username, user);
        dataModel.data = updatedUser;
        dataModel.links = [link1, link2];
        return dataModel;
    }

    @Delete(':username')
    async removeByUsername(
        @Param('username') username: string) {
        const dataModel = new DataModel();
        const link1 = new LinkModel({
            href: '/users/' + username,
            method: http[http.GET],
            rel: 'self',
        });
        const link2 = new LinkModel({
            href: '/users/' + username,
            method: http[http.PATCH],
            rel: 'self',
        });
        const removedUser = this.userService.removeUserByUsername(username);
        dataModel.data = removedUser;
        dataModel.links = [link1, link2];
        return dataModel;
    }
}