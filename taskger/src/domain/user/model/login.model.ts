import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@domain/user/model/user.model';

@ObjectType({ description: 'logged user' })
export class LoggedUser {
  @Field()
  user: User;

  @Field()
  token: string;
}
