import { Get, Controller, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from 'models/user.model';
import { RaceOperator } from 'rxjs/internal/observable/race';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('/:id')
  GetPostById(@Param() id){
    return 'Looking for post with id' + id + '.';
  }

  @Post()
  async create(@Body() person: User){
    return {body: person};
  }

  // @Post()
  // create(@Body() content: string){
  //   return {body: content};
  // }
}
