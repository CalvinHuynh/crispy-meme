import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { UserModel } from './models/user.model';
import { GenerateEmail, GenerateUsername } from './helper/generator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  const options = new DocumentBuilder()
    .setTitle('ALICE webdev endpoints')
    .setDescription('Try out the API\'s below')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Posts')
    .addTag('Topics')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

createConnection().then(async connection => {

  const userRepository = connection.getRepository(UserModel);
  console.log('Creating new user...');
  const user = new UserModel({
    username: GenerateUsername(),
    birthDate: new Date('2012-02-25'),
    email: GenerateEmail(10, 5),
  });

  await userRepository.save(user);
  await userRepository.find();
}).catch(error => console.log(error));

bootstrap();
