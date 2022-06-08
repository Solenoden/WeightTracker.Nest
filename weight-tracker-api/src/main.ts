import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get('PORT') || 3000;
  await app.listen(port);

  const logger = app.get(Logger);
  logger.log(`Running on PORT: ${port}`)
}
void bootstrap();