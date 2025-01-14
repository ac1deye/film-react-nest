export class GetFilmDto {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: GetScheduleDto[];
}

export class GetFilmsDto {
  total: number;
  items: GetFilmDto[];
}

export class GetScheduleDto {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class GetSchedulesDto {
  total: number;
  items: GetScheduleDto[];
}
