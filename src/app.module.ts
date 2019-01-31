import { Module } from '@nestjs/common';
import { ApolloModule } from './apollo.module';
import { UserModule } from './users/users.module';
import { ReservationModule } from './reservations/reservation.module';
import { HotelModule } from './hotels/hotel.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from './common/dataloader.interceptor';

@Module({
  imports: [
    ApolloModule,
    UserModule,
    ReservationModule,
    HotelModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class AppModule {}
