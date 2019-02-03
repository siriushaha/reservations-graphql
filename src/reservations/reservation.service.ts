import { Injectable } from '@nestjs/common';
import { Reservation } from './model/reservation';
import { ReservationInput } from './dto/reservationInput';

@Injectable()
export abstract class ReservationService {

  abstract find(): Reservation[] | [];

  abstract findById(id: number): Reservation | null;

  abstract create(reservationInput: ReservationInput, userId: number): Reservation;

  abstract findByUserId(id: number): Reservation[] | null;

  abstract async findMany(ids: number[]);

  abstract update(id: number, reservationInput: ReservationInput): Reservation;
}
