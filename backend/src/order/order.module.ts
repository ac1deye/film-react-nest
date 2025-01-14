import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { FilmsRepository } from 'src/repository/films.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from 'src/repository/schemas/film.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, FilmsRepository],
})
export class OrderModule {}
