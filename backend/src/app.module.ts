import { Module } from '@nestjs/common';
import { ServeStaticModule } from "@nestjs/serve-static";
import { ConfigModule } from "@nestjs/config";
import * as path from "node:path";
import { MongooseModule } from '@nestjs/mongoose';

import { configProvider } from "./app.config.provider";
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      renderPath: '/content/afisha/',
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    FilmsModule,
    OrderModule,
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule { }
