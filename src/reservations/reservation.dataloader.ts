import { NestDataLoader } from 'src/common/dataloader.interface';
import * as DataLoader from 'dataloader';
import { ReservationService } from './reservation.service';
import { Reservation } from './model/reservation';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationDataloader implements NestDataLoader {
  constructor(private readonly reservationService: ReservationService) {}

  generateDataLoader(): DataLoader<any, any> {
    return new DataLoader<number, Reservation[]>(this.reservationService.findMany);
  }
}
