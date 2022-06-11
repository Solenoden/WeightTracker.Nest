import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(Logger);

  setupSwagger(app, logger);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  await app.listen(port);

  logger.log(`Running on PORT: ${port}`);
}
void bootstrap();

function setupSwagger(app: INestApplication, logger: Logger): void {
  const swaggerConfig = new DocumentBuilder()
      .setTitle('Weight Tracker API')
      .setDescription('A Nest API for a simple weight tracking app')
      .setVersion('1.0.0')
      .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const path = 'api/documentation';
  SwaggerModule.setup(path, app, document);

  logger.log(`Swagger documentation compiled. Consume at endpoint: ${path}`);
}