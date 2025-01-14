import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';

import { Film } from './schemas/film.schema';
import { GetFilmDto, GetScheduleDto } from '../films/dto/films.dto';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  async findAll(): Promise<GetFilmDto[]> {
    return this.filmModel
      .find({})
      .then((doc) => doc.map((doc) => this.getFilmMapperFn(doc)));
  }

  async findOne(id: string): Promise<GetFilmDto> {
    return this.filmModel
      .findOne({ id: id })
      .then((doc) => this.getFilmMapperFn(doc));
  }

  async updateOne(id: string, update: UpdateQuery<Film>) {
    return this.filmModel.updateOne({ id: id }, update);
  }

  private getFilmMapperFn: (root: Film) => GetFilmDto = (root) => {
    return {
      id: root.id,
      rating: root.rating,
      director: root.director,
      tags: root.tags,
      image: root.image,
      cover: root.cover,
      title: root.title,
      about: root.about,
      description: root.description,
      schedule: root.schedule.map(this.getScheduleMapperFn()),
    };
  };

  private getScheduleMapperFn(): (Schedule) => GetScheduleDto {
    return (root) => {
      return {
        id: root.id,
        daytime: root.daytime,
        hall: root.hall,
        rows: root.rows,
        seats: root.seats,
        price: root.price,
        taken: root.taken,
      };
    };
  }
}
