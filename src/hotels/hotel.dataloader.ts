import { NestDataLoader } from 'src/common/dataloader.interface';
import DataLoader from 'dataloader';
import { HotelService } from './hotel.service';
import { Hotel } from './model/hotel';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelDataloader implements NestDataLoader {
  constructor(private readonly hotelService: HotelService) {}

  generateDataLoader(): DataLoader<any, any> {
    return new DataLoader<number, Hotel>(this.hotelService.findMany);
  }
}
