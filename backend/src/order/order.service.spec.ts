import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto, TicketDto } from './dto/order.dto';
import { GetFilmDto, GetScheduleDto } from 'src/films/dto/films.dto';
import { Film } from '../films/entities/film.entity';

describe('OrderService', () => {
  let service: OrderService;

  const scheduleMock: GetScheduleDto = {
    id: '02a9feb2-fc92-4386-a917-aa79e7f8fd7f',
    daytime: '2024-06-30T18:00:53+03:00',
    hall: 2,
    rows: 5,
    seats: 10,
    price: 350,
    taken: ['1:1'],
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

  const ticketsMock: TicketDto[] = [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '02a9feb2-fc92-4386-a917-aa79e7f8fd7f',
      daytime: '2024-06-30T18:00:53+03:00',
      row: 3,
      seat: 5,
      price: 350,
    },
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '02a9feb2-fc92-4386-a917-aa79e7f8fd7f',
      daytime: '2024-06-30T18:00:53+03:00',
      row: 3,
      seat: 6,
      price: 350,
    },
  ];

  const orderMock: CreateOrderDto = {
    tickets: ticketsMock,
    email: 'mail@ya.ru',
    phone: '+79991112233',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Film),
          useValue: {
            find: jest.fn().mockResolvedValue([filmMock]),
          },
        },
        {
          provide: DataSource,
          useValue: {
            createQueryRunner: jest.fn().mockImplementation(() => ({
              connect: jest.fn(),
              startTransaction: jest.fn(),
              release: jest.fn(),
              rollbackTransaction: jest.fn(),
              manager: {
                save: jest.fn(),
              },
            })),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    filmMock.schedule[0].taken = [];
  });

  describe('.createOrder()', () => {
    it('should create an order', async () => {
      const result = await service.createOrder(orderMock);
      expect(result).toEqual({ items: ticketsMock, total: 2 });
    });

    it('should throw exception if place is taken', async () => {
      filmMock.schedule[0].taken = ['3:5'];
      const error = service.createOrder(orderMock);
      expect(error).rejects.toThrow(BadRequestException);
    });
  });
});
