import { ObjectType, Field, ID } from 'nest-type-graphql';
import { Reservation } from 'src/reservations/model/reservation';
import { MetaData } from 'src/common/MetaData';

@ObjectType({ implements: MetaData })
export class User implements MetaData {
  @Field(type => ID)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  public password: string;

  @Field(type => [Reservation], { nullable: true })
  reservations?: Reservation[];

  createdAt: Date;
  updatedAt: Date;
}
