import { Injectable } from '@nestjs/common';
import { GetFilmsDto, GetSchedulesDto } from './dto/films.dto';
import { FilmsRepository } from 'src/repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmRepository: FilmsRepository) {}

  async findAll(): Promise<GetFilmsDto> {
    return this.filmRepository.findAll().then((films) => {
      return {
        total: films.length,
        items: films,
      };
    });
  }

  async findSchedule(id: string): Promise<GetSchedulesDto> {
    return this.filmRepository.findOne(id).then((film) => {
      return {
        total: film.schedule.length,
        items: film.schedule,
      };
    });
  }
}
