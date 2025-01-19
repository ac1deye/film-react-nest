import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class GetFilmDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  tags: string[];

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  cover: string;
  title: string;

  @IsString()
  @IsNotEmpty()
  about: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @ValidateNested({ each: true })
  @Type(() => GetScheduleDto)
  schedule: GetScheduleDto[];
}

export class GetFilmsDto {
  @IsNumber()
  @IsNotEmpty()
  total: number;
  @ValidateNested({ each: true })
  @Type(() => GetFilmDto)
  items: GetFilmDto[];
}

export class GetScheduleDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  daytime: string;

  @IsNumber()
  @IsNotEmpty()
  hall: number;

  @IsNumber()
  @IsNotEmpty()
  rows: number;

  @IsNumber()
  @IsNotEmpty()
  seats: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @IsNotEmpty()
  taken: string[];
}

export class GetSchedulesDto {
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @ValidateNested({ each: true })
  @Type(() => GetScheduleDto)
  items: GetScheduleDto[];
}
