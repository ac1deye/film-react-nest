import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { DevLogger } from './loggers/dev.logger';
import { TskvLogger } from './loggers/tskv.logger';
import { JsonLogger } from './loggers/json.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  app.useLogger(
    (() => {
      switch (process.env.LOGGER) {
        case 'json':
          return new JsonLogger();
        case 'tskv':
          return new TskvLogger();
        default:
          return new DevLogger();
      }
    })(),
  );

  await app.listen(3000);
}
bootstrap();
