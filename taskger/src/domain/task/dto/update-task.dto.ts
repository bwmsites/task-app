import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

@InputType()
export class UpdateTaskInput {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(30)
  title?: string;

  @Field({ nullable: true })
  @IsString()
  @Length(30, 255)
  description?: string;
}
