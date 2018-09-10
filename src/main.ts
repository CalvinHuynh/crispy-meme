import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './models/user.model';
import { GenerateEmail, GenerateUsername } from './helper/generator';

// To be removed
let globalFlag = 0;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('ALICE API Endpounts')
    .setDescription('Try out the API\'s below')
    .setVersion('1.0')
    .addTag('Stuff')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

createConnection().then(async connection => {

  const userRepository = connection.getRepository(User);

  if (globalFlag === 0) {
    console.log('Inserting a new user into the database...');
    const user = new User({
      username: GenerateUsername(),
      birthDate: new Date('2012-02-25'),
      email: GenerateEmail(10, 5),
    });

    await userRepository.save(user);
    console.log('Saved a new user: ' + user);
    globalFlag++;

    const allUsers = await userRepository.find();
    console.log('All the users from the db: ', allUsers);
  }
  
}).catch(error => console.log(error));

bootstrap();
