import { Field } from 'nest-type-graphql';
import { ObjectType, ID } from 'type-graphql';

import { User } from 'src/users/model/user';
import { Hotel } from 'src/hotels/model/hotel';
import { MetaData } from 'src/common/MetaData';

@ObjectType({ implements: MetaData })
export class Reservation implements MetaData {
  @Field(type => ID)
  public id: number;

  @Field()
  public name: string;

  @Field()
  public hotelName: string;

  @Field()
  public arrivalDate: Date;

  @Field()
  public departureDate: Date;

  @Field(type => User)
  public user?: User;

  public userId: number;

  @Field(type => Hotel)
  public hotel?: Hotel;

  public hotelId: number;

  createdAt: Date;
  updatedAt: Date;
}
