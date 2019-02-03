import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Hotel } from '../model/hotel';
import { HotelInput } from '../dto/hotelInput';
import { HotelService} from '../hotel.service';

@Injectable()
export class HotelMemoryService implements HotelService {
  private hotels: Hotel[] = [
    plainToClass(Hotel, {
      id: 1,
      name: 'Hilton',
      address: '345 Second Ave, San Francisco, CA 94536',
      phone: '415 546-4567',
      fax: '415 546-4568',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    plainToClass(Hotel, {
      id: 2,
      name: 'Marriott',
      address: '345 Second Ave, Los Angeles, CA 94523',
      phone: '310 665-4567',
      fax: '310 665-4568',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];

  private nextId = 3;

  public find(): Hotel[] {
    return this.hotels;
  }

  public findById(id: number): Hotel {
    return this.hotels.find(x => x.id === id);
  }

  public create(hotelInput: HotelInput) {
    const hotel = plainToClass(Hotel, {
      ...hotelInput,
      id: this.nextId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.nextId++;
    this.hotels.push(hotel);
    return hotel;
  }

  public async findMany(ids: number[]) {
    return this.hotels.filter(x => ids.some(y => y === x.id));
  }

  public update(id: number, hotelInput: HotelInput): Hotel {
    const index = this.hotels.findIndex(x => x.id === id);
    this.hotels[index] = {
      ...this.hotels[index],
      ...hotelInput,
      updatedAt: new Date(),
    };
    return this.hotels[index];
  }
}
