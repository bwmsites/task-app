import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatusEnum } from '@common/enums/TaskStatus.enum';

@InputType()
export class SetTaskStatusInput {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field(() => TaskStatusEnum)
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
