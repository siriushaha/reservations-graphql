import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Context,
} from 'nest-type-graphql';
import { Hotel } from './model/hotel';
import { HotelService } from './hotel.service';
import { HotelInput } from './dto/hotelInput';
import { User } from 'src/users/model/user';
import {
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/AuthGuard';

@Resolver(type => Hotel)
export class HotelResolver {
  constructor(
    private readonly hotelService: HotelService,
  ) {}

  @Query(returns => [Hotel], { name: 'hotels' })
  hotels(): Hotel[] {
    return this.hotelService.find();
  }

  @Query(returns => Hotel)
  hotelById(@Arg('id') id: number): Hotel {
    const hotel = this.hotelService.findById(id);
    if (hotel) {
      return hotel;
    } else {
      throw new NotFoundException();
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => Hotel)
  createHotel(@Arg('data') hotelInput: HotelInput): Hotel {
    return this.hotelService.create(hotelInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => Hotel)
  updateHotel(
    @Arg('id') id: number,
    @Arg('data') hotelInput: HotelInput,
    @Context('user') user: User,
  ): Hotel {
    const hotel = this.hotelService.findById(id);
    if (!hotel) {
      throw new NotFoundException();
    }
    return this.hotelService.update(id, hotelInput);
  }

}
