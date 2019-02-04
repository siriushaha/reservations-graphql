import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Context,
  Parent,
  FieldResolver,
  ID,
} from 'nest-type-graphql';
import Dataloader from 'dataloader';
import {
  UseGuards,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { Reservation } from './model/reservation';
import { ReservationService } from './reservation.service';
import { HotelService } from 'src/hotels/hotel.service';
import { ReservationInput } from './dto/reservationInput';
import { User } from 'src/users/model/user';
import { Hotel } from 'src/hotels/model/hotel';

import { AuthGuard } from 'src/common/AuthGuard';
// import { AuthenticationError, ForbiddenError, gql } from 'apollo-server-core';
// import { Loader } from 'src/common/loader.decorator';
import { UserLoader } from 'src/users/user.dataloader';

@Resolver(type => Reservation)
export class ReservationResolver {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly hotelService: HotelService,
  ) {}

  @Query(returns => [Reservation], { name: 'reservations' , nullable: true})
  reservations(): Reservation[] {
    return this.reservationService.find();
  }

  @Query(returns => Reservation, { nullable: true })
  reservationById(@Arg('id', type => ID) id: number): Reservation {
    const reservation = this.reservationService.findById(id);
    if (reservation) {
      return reservation;
    } else {
      throw new NotFoundException();
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => Reservation)
  createReservation(
    @Arg('data') reservationInput: ReservationInput,
    @Context('user') user: User,
  ): Reservation {
    return this.reservationService.create(reservationInput, user.id);
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => Reservation)
  updateReservation(
    @Arg('id', type => ID) id: number,
    @Arg('data') reservationInput: ReservationInput,
    @Context('user') user: User,
  ): Reservation {
    const reservation = this.reservationService.findById(id);
    if (!reservation) {
      throw new NotFoundException();
    }
    if (reservation.userId !== user.id) {
      throw new ForbiddenException('This is not your reservation');
    }
    return this.reservationService.update(id, reservationInput);
  }

  @FieldResolver(returns => User)
  user(
    @Parent() reservation: Reservation,
    @Context('UserLoader') userLoader: Dataloader<number, User>,
  ) {
    return userLoader.load(reservation.userId);
  }

  @FieldResolver(returns => Hotel)
  hotel(
    @Parent() reservation: Reservation,
  ) {
    return this.hotelService.findById(reservation.hotelId);
  }
}
