import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  GetFilmDto,
  GetFilmsDto,
  GetScheduleDto,
  GetSchedulesDto,
} from './dto/films.dto';
import { Film } from './entities/film.entity';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class FilmsService {
  constructor(@InjectRepository(Film) private repository: Repository<Film>) {}

  async findAll(): Promise<GetFilmsDto> {
    return this.repository
      .find({ relations: { schedule: true } })
      .then((films) => films.map((film) => this.getFilmMapperFn(film)))
      .then((films) => {
        return {
          total: films.length,
          items: films,
        };
      });
  }

  async findSchedule(id: string): Promise<GetSchedulesDto> {
    return this.repository
      .findOne({
        where: { id },
        relations: { schedule: true },
      })
      .then((film) => this.getFilmMapperFn(film))
      .then((film) => {
        return {
          total: film.schedule.length,
          items: film.schedule,
        };
      });
  }

  private getFilmMapperFn: (root: Film) => GetFilmDto = (root) => {
    return {
      id: root.id,
      rating: root.rating,
      director: root.director,
      tags: root.tags.split(','),
      image: root.image,
      cover: root.cover,
      title: root.title,
      about: root.about,
      description: root.description,
      schedule: root.schedule.map(this.getScheduleMapperFn()),
    };
  };

  private getScheduleMapperFn(): (schedule: Schedule) => GetScheduleDto {
    return (root: Schedule) => {
      const taken = root.taken === '' ? [] : root.taken.split(',');
      return {
        id: root.id,
        daytime: root.daytime,
        hall: root.hall,
        rows: root.rows,
        seats: root.seats,
        price: root.price,
        taken: taken,
      };
    };
  }
}
