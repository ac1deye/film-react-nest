export class TicketDTO {
    film: string;
    session: string;
    daytime: string;
    row: number;
    seat: number;
    price: number;
}

export class CreateOrderDto {
    email: string;
    phone: string;
    tickets: TicketDTO[];
}