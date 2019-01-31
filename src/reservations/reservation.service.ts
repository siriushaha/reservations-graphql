import { Injectable } from '@nestjs/common';
import { Reservation } from './model/reservation';
import { ReservationInput } from './dto/reservationInput';

@Injectable()
export abstract class ReservationService {

  abstract find(): Reservation[] | [];

  abstract findById(id: number): Reservation;

  abstract create(reservationInput: ReservationInput, userId: number): Reservation;

  abstract findByUserId(id: number): Reservation[] | null;

  abstract findMany(ids: number[]): Reservation[];

  abstract update(id: number, reservationInput: ReservationInput): Reservation;
}
