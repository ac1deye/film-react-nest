import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Film, FilmSchema } from 'src/repository/schemas/film.schema';
import { FilmsRepository } from 'src/repository/films.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]), 
  ],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
})
export class FilmsModule { }
