import { Injectable } from '@nestjs/common';
import { Hotel } from './model/hotel';
import { HotelInput } from './dto/hotelInput';

@Injectable()
export abstract class HotelService {

  abstract find(): Hotel[];

  abstract findById(id: number): Hotel;

  abstract create(hotelInput: HotelInput): Hotel;

  abstract async findMany(ids: number[]);

  abstract update(id: number, hotelInput: HotelInput): Hotel;
}
