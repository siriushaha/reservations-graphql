import { Module } from '@nestjs/common';
import { ReservationMemoryService } from './data-source/reservation.memory.service';
import { ReservationService } from './reservation.service';
import { ReservationResolver } from './reservation.resolver';
import { ReservationDataloader } from './reservation.dataloader';
import { HotelModule} from '../hotels/hotel.module';

@Module({
  imports: [
    HotelModule,
  ],
  providers: [
    ReservationMemoryService,
    { provide: ReservationService, useClass: ReservationMemoryService},
    ReservationResolver,
    ReservationDataloader,
  ],
  exports: [ReservationService, ReservationDataloader],
})
export class ReservationModule {}
