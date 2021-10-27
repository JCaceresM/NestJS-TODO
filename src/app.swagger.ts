import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
   .setTitle('Super API')
    .addBearerAuth()
    .setDescription(
      'Esta es una API Creada con NestJS con muchos feactures como , usuarios, roles, todos, entre otras',
    ).addTag('Endpoints')
    .build();
    
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);
};
