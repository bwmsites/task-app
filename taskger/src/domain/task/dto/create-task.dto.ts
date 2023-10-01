import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsString, Length, MaxLength } from 'class-validator';
import { TaskStatusEnum } from '@common/enums/TaskStatus.enum';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsString()
  @MaxLength(30)
  title: string;

  @Field()
  @IsString()
  @Length(30, 255)
  description: string;

  @Field(() => TaskStatusEnum)
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;

  @Field()
  @IsString()
  userId: string;
}
