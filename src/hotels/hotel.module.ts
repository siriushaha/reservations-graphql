import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelResolver } from './hotel.resolver';
import { HotelDataloader } from './hotel.dataloader';
import { HotelMemoryService } from './data-source/hotel.memory.service';

@Module({
  providers: [
    HotelMemoryService,
    { provide: HotelService, useClass: HotelMemoryService},
    HotelResolver,
    HotelDataloader,
  ],
  exports: [HotelService, HotelDataloader],
})
export class HotelModule {}
