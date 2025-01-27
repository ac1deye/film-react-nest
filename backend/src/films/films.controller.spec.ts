import { Test, TestingModule } from '@nestjs/testing';

import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { GetFilmDto, GetScheduleDto } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn().mockResolvedValue({
          total: [filmMock].length,
          items: [filmMock],
        }),
        findSchedule: jest.fn().mockResolvedValue(scheduleMock),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('.findAll()', () => {
    it('controller should return all films', async () => {
      const expected = {
        total: [filmMock].length,
        items: [filmMock],
      };

      const films = await controller.findAll();

      expect(films).toEqual(expected);
    });

    it('service method should have been called', async () => {
      await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('.findSchedule()', () => {
    it('should return schedule', async () => {
      const filmId = '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf';

      const schedule = await controller.findSchedule(filmId);

      expect(schedule).toEqual(scheduleMock);
    });

    it('service method should have been called', async () => {
      const filmId = '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf';

      await controller.findSchedule(filmId);

      expect(service.findSchedule).toHaveBeenCalledWith(filmId);
    });
  });
});
