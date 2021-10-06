import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as bodyParser from 'body-parser';
import { API_PREFIX } from './common/constants/global/globalContansts';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(API_PREFIX);
  app.enableCors();
  app.use(helmet());
  const config = new DocumentBuilder()
  .setTitle('nestjs')
  .setDescription('This is NestJS app')
  .setVersion('1.0')
  .addTag('Endpoints')
  .build();

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-swagger', app, document);
  await app.listen(AppModule.port||3001);
}
bootstrap();
