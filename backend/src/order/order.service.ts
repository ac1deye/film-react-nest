import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto, TicketDTO } from './dto/order.dto';
import { Film } from 'src/films/entities/film.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Film) private repository: Repository<Film>,
    private readonly dataSource: DataSource,
  ) {}

  async createOrder(
    orderData: CreateOrderDto,
  ): Promise<{ items: TicketDTO[]; total: number }> {
    const tickets = orderData.tickets;
    const filmsToUpdate = [];

    const films = await this.repository.find({
      relations: { schedule: true },
      where: {
        id: In(tickets.map((ticket) => ticket.film)),
      },
    });

    for (const ticket of tickets) {
      const film = films.find((film) => film.id == ticket.film);

      this.repository.find({ relations: { schedule: true } });

      const scheduleIndex = film.schedule.findIndex(
        (s) => s.id === ticket.session,
      );
      const place = `${ticket.row}:${ticket.seat}`;

      if (film.schedule[scheduleIndex].taken.includes(place)) {
        throw new BadRequestException(`Место ${place} занято`);
      }

      const taken = film.schedule[scheduleIndex].taken;
      film.schedule[scheduleIndex].taken =
        taken === '' ? place : `${taken},${place}`;

      if (!filmsToUpdate.some((upd) => upd.id === film.id)) {
        filmsToUpdate.push(film);
      }
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await Promise.all(
        filmsToUpdate.map((film) => queryRunner.manager.save(film)),
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      new ConflictException('Не удалось занять места');
    } finally {
      await queryRunner.release();
    }

    return {
      items: tickets,
      total: tickets.length,
    };
  }
}
