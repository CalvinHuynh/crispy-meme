import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModel } from '../models/user.model';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}