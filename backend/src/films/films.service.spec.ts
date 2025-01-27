import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { FilmsService } from './films.service';
import {
  GetFilmDto,
  GetFilmsDto,
  GetScheduleDto,
  GetSchedulesDto,
} from './dto/films.dto';
import { Film } from './entities/film.entity';

describe('FilmsService', () => {
  let service: FilmsService;

  const scheduleMock: GetScheduleDto = {
    id: '02a9feb2-fc92-4386-a917-aa79e7f8fd7f',
    daytime: '2024-06-30T18:00:53+03:00',
    hall: 2,
    rows: 5,
    seats: 10,
    price: 350,
    taken: [],
  };

  const filmMock: GetFilmDto = {
    id: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
    rating: 5,
    director: 'Итан Райт',
    tags: ['Документальный'],
    image: '/bg1s.jpg',
    cover: '/bg1c.jpg',
    title: 'Архитекторы общества',
    about:
      'Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.',
    description:
      'Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.',
    schedule: [scheduleMock],
  };

  const repositoryMock = {
    find: jest.fn().mockResolvedValue([filmMock]),
    findOne: jest.fn().mockResolvedValue(filmMock),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: getRepositoryToken(Film),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('.findAll()', () => {
    it('service should return all films', async () => {
      const expected: GetFilmsDto = {
        total: [filmMock].length,
        items: [filmMock],
      };

      const films = await service.findAll();

      expect(films).toEqual(expected);
    });

    it('repository method should have been called', async () => {
      await service.findAll();

      expect(repositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('.findSchedule()', () => {
    it('should return schedule', async () => {
      const expected: GetSchedulesDto = {
        total: filmMock.schedule.length,
        items: filmMock.schedule,
      };
      const filmId = '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf';

      const schedule = await service.findSchedule(filmId);

      expect(schedule).toEqual(expected);
    });

    it('repository method should have been called', async () => {
      const filmId = '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf';

      await service.findSchedule(filmId);

      expect(repositoryMock.findOne).toHaveBeenCalled();
    });
  });
});
