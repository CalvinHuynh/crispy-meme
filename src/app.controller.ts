import { Get, Controller, Post, Body, Param, Head } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // root(): string {
  //   return this.appService.root();
  // }

  // @Get(':id')
  // GetPostById(@Param('id') id: number){
  //   return 'Looking for post with id ' + id + '.';
  // }

  // @Post()
  // async create(@Body() person: User){
  //   return {body: person};
  // }
}
