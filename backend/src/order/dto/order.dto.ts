import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class TicketDto {
  @IsString()
  @IsNotEmpty()
  film: string;

  @IsString()
  @IsNotEmpty()
  session: string;

  @IsString()
  @IsNotEmpty()
  daytime: string;

  @IsNumber()
  @IsNotEmpty()
  row: number;

  @IsNumber()
  @IsNotEmpty()
  seat: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class CreateOrderDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}
