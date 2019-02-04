import { Field } from 'nest-type-graphql';
import { ObjectType, ID } from 'type-graphql';

import { MetaData } from 'src/common/MetaData';

@ObjectType({ implements: MetaData })
export class Hotel implements MetaData {
  @Field(type => ID)
  public id: number;

  @Field()
  public name: string;

  @Field()
  public address: string;

  @Field()
  public phone: string;

  @Field()
  public fax: string;

  createdAt: Date;
  updatedAt: Date;
}
