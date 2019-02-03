import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Reservation } from '../model/reservation';
import { ReservationInput } from '../dto/reservationInput';
import { ReservationService} from '../reservation.service';

@Injectable()
export class ReservationMemoryService implements ReservationService {

  private reservations: Reservation[] = [
    plainToClass(Reservation, {
      id: 1,
      name: 'Bob Smith',
      hotelName: 'Hilton',
      arrivalDate: new Date(),
      departureDate: new Date(),
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    plainToClass(Reservation, {
      id: 2,
      name: 'Sam Kennedy',
      hotelName: 'Four Seasons',
      arrivalDate: new Date(),
      departureDate: new Date(),
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];

  private nextId = 3;

  public find(): Reservation[] {
    return this.reservations;
  }

  public findById(id: number): Reservation {
    return this.reservations.find(x => x.id === id);
  }

  public create(reservationInput: ReservationInput, userId: number): Reservation {
    const reservation = plainToClass(Reservation, {
      ...reservationInput,
      id: this.nextId,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.nextId++;
    this.reservations.push(reservation);
    return reservation;
  }

  public findByUserId(id: number): Reservation[] | null {
    return this.reservations.filter(x => x.userId === id);
  }

  public async findMany(ids: number[]) {
    return this.reservations.filter(x => ids.some(y => y === x.id));
  }

  public update(id: number, reservationInput: ReservationInput): Reservation {
    const index = this.reservations.findIndex(x => x.id === id);
    this.reservations[index] = {
      ...this.reservations[index],
      ...reservationInput,
      updatedAt: new Date(),
    };
    return this.reservations[index];
  }
}
