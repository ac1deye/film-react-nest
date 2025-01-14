import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateOrderDto, TicketDTO } from './dto/order.dto';
import { FilmsRepository } from 'src/repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(
    orderData: CreateOrderDto,
  ): Promise<{ items: TicketDTO[]; total: number }> {
    const tickets = orderData.tickets;
    for (const ticket of tickets) {
      const film = await this.filmsRepository.findOne(ticket.film);
      const scheduleIndex = film.schedule.findIndex(
        (s) => s.id === ticket.session,
      );
      const place = `${ticket.row}:${ticket.seat}`;

      if (film.schedule[scheduleIndex].taken.includes(place)) {
        throw new BadRequestException(`Место ${place} занято`);
      }

      await this.updateSeats(ticket.film, scheduleIndex, place);
    }

    return {
      items: tickets,
      total: tickets.length,
    };
  }

  async updateSeats(film: string, scheduleIndex: number, place: string) {
    try {
      this.filmsRepository.updateOne(film, {
        $push: { [`schedule.${scheduleIndex}.taken`]: place },
      });
    } catch {
      new ConflictException('Не удалось занять места');
    }
  }
}
