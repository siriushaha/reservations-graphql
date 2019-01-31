import { InputType, Field } from 'nest-type-graphql';

@InputType()
export class ReservationInput {
  @Field()
  public name: string;

  @Field()
  public hotelName: string;

  @Field()
  public arrivalDate: Date;

  @Field()
  public departureDate: Date;

  @Field()
  public hotelId: number;
}
