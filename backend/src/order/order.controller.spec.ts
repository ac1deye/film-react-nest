import { Test, TestingModule } from '@nestjs/testing';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto, TicketDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const ticketsMock: TicketDto[] = [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: 'uuid',
      daytime: '2024-06-30T18:00:53+03:00',
      row: 3,
      seat: 5,
      price: 350,
    },
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: 'uuid',
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
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn().mockResolvedValue({
          items: ticketsMock,
          total: 2,
        }),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('.createOrder()', () => {
    it('controller should return order', async () => {
      const order = await controller.createOrder(orderMock);

      expect(order).toEqual({
        items: ticketsMock,
        total: 2,
      });
    });

    it('service method should have been called', async () => {
      await controller.createOrder(orderMock);

      expect(service.createOrder).toHaveBeenCalledWith(orderMock);
    });
  });
});
