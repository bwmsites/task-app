import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length, MaxLength, IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MaxLength(30)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @Length(8, 10)
  password: string;
}
