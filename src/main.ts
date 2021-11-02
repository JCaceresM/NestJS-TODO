import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { API_PREFIX } from './common/constants/global/globalContansts';
import { generateTypeormConfigFile } from './scripts';
import { ConfigService } from '@nestjs/config';
import { initSwagger } from './app.swagger';
import { AppConfigService } from './config/getterConfig.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import setDefaultUser from './scripts/setDefaultUser';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const appConfig = app.get(AppConfigService)
  const logger = new Logger('Bootstrap');
  
  app.setGlobalPrefix(API_PREFIX);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());


  initSwagger(app)
  
  generateTypeormConfigFile(config, appConfig);
  setDefaultUser(config)
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  
  await app.listen(AppModule.port||3001);
  logger.log(`Server is running at ${await app.getUrl()}`);

}
bootstrap();
