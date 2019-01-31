import { InputType, Field } from 'nest-type-graphql';

@InputType()
export class HotelInput {
  @Field()
  public name: string;

  @Field()
  public address: string;

  @Field()
  public phone: string;

  @Field()
  public fax: string;
}
